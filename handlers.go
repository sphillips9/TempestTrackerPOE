package main

import (
	"encoding/json"
	//  "fmt"
	"io"
	"io/ioutil"
	"net/http"
	"time"
)

func getExpireTime() int64 {
	now := time.Now()
	expire := now.Add(time.Minute * 60)
	nanos := expire.UnixNano()
	return nanos / 1000000
}

func handleVote(w http.ResponseWriter, req *http.Request) {

	defer req.Body.Close()
	w.Header().Add("Access-Control-Allow-Origin", "*")
	w.WriteHeader(200)

	switch req.Method {
	case "POST":
		buffer, err := ioutil.ReadAll(req.Body)
		vote := &tempestVote{}
		err = json.Unmarshal(buffer, &vote)

		if err != nil {
			return
		}

		if vote.Rating != 0 && vote.Rating != 1 {
			return
		}

		func() {

			tempLock.Lock()
			defer tempLock.Unlock()

			prefixRatings[vote.Prefix].Votes++
			prefixRatings[vote.Prefix].Upvotes += vote.Rating
			suffixRatings[vote.Suffix].Votes++
			suffixRatings[vote.Suffix].Upvotes += vote.Rating

		}()

		j, err := json.Marshal(vote)
		update := &UpdatePacket{}
		update.Event = "RATING"
		update.Message = string(j)

		hub.Broadcast(update)

	}

}

func handleTempests(w http.ResponseWriter, req *http.Request) {

	defer req.Body.Close()
	w.Header().Add("Access-Control-Allow-Origin", "*")
	w.WriteHeader(200)

	switch req.Method {
	case "POST":

		buffer, err := ioutil.ReadAll(req.Body)
		tempest := &Tempest{}
		err = json.Unmarshal(buffer, &tempest)

		if err != nil {
			return
			//fmt.Println(err.Error())
		} else {

			tempest.Expire = getExpireTime()
			func() {
				tempLock.Lock()
				defer tempLock.Unlock()
				tempests = append(tempests, tempest)

			}()

		}

		j, err := json.Marshal(tempest)
		update := &UpdatePacket{}
		update.Event = "TEMPEST"
		update.Message = string(j)

		hub.Broadcast(update)
	case "GET":
		j, err := json.Marshal(tempests)

		if err == nil {
			w.Write(j)
		}

	}

}

func eventSource(w http.ResponseWriter, req *http.Request) {

	h, _ := w.(http.Hijacker)
	conn, rw, _ := h.Hijack()
	defer conn.Close()

	rw.Write([]byte("HTTP/1.1 200 OK\r\n"))
	rw.Write([]byte("Access-Control-Allow-Origin: *\r\n"))
	rw.Write([]byte("Content-Type: text/event-stream\r\n\r\n"))
	rw.Flush()

	disconnect := make(chan bool, 1)

	go func() {
		_, err := rw.ReadByte()
		if err == io.EOF {
			disconnect <- true
		}
	}()

	uc := newUserConnection()
	hub.Add(uc)

	func() {
		tempLock.Lock()
		defer tempLock.Unlock()

		tj, err := json.Marshal(tempests)

		if err != nil {
			return
		}

		ratings := &currentRatings{}
		ratings.PrefixRatings = prefixRatings
		ratings.SuffixRatings = suffixRatings

		rj, err := json.Marshal(ratings)

		if err != nil {
			return
		}

		rw.Write([]byte("event: " + "TEMPEST" + "\n"))
		rw.Write([]byte("data: " + string(tj) + "\n\n"))
		rw.Write([]byte("event: " + "INITRATING" + "\n"))
		rw.Write([]byte("data: " + string(rj) + "\n\n"))
		rw.Flush()

	}()

	for {

		select {
		case <-disconnect:
			return

		case update := <-uc.Queue:

			rw.Write([]byte("event: " + update.Event + "\n"))
			rw.Write([]byte("data: " + update.Message + "\n\n"))
			rw.Flush()

		}

	}

}
