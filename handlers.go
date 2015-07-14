package main

import (
	"encoding/json"
	"io"
	"io/ioutil"
	"net/http"
)

func getExpireTime() int64 {
	//now := time.Now()
	//expire := now.Add(time.Minute * 60)
	nanos := nextHour.UnixNano()
	return nanos / 1000000
}

func handleParty(w http.ResponseWriter, req *http.Request) {

	defer req.Body.Close()
	w.Header().Add("Access-Control-Allow-Origin", "*")
	w.WriteHeader(200)

	switch req.Method {
	case "POST":
		buffer, err := ioutil.ReadAll(req.Body)
		party := &tempestParty{}
		err = json.Unmarshal(buffer, &party)

		if err != nil {
			return
		}

		func() {
			tempLock.Lock()
			defer tempLock.Unlock()
			tempestParties = append(tempestParties, party)
		}()

		j, err := json.Marshal(party)
		update := &UpdatePacket{}
		update.Event = "PARTY"
		update.Message = string(j)

		hub.Broadcast(update)
	}

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

			func() {
				tempLock.Lock()
				defer tempLock.Unlock()

				tempest.Expire = getExpireTime()
				tempest.Id = nextTempestId
				nextTempestId++
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

		pj, err := json.Marshal(tempestParties)

		if err != nil {
			return
		}

		rw.Write([]byte("event: " + "TEMPEST" + "\r\n"))
		rw.Write([]byte("data: " + string(tj) + "\r\n\r\n"))
		rw.Write([]byte("event: " + "INITRATING" + "\r\n"))
		rw.Write([]byte("data: " + string(rj) + "\r\n\r\n"))
		rw.Write([]byte("event: " + "PARTY" + "\r\n"))
		rw.Write([]byte("data: " + string(pj) + "\r\n\r\n"))
		rw.Flush()

	}()

	for {

		select {
		case <-disconnect:
			return

		case update := <-uc.Queue:

			rw.Write([]byte("event: " + update.Event + "\r\n"))
			rw.Write([]byte("data: " + update.Message + "\r\n\r\n"))
			rw.Flush()

		}

	}

}
