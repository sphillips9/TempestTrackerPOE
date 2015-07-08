package main

import (
	"net/http"
	"sync"
	"time"
)

type Tempest struct {
	Type       string `json:"type"`
	Difficulty string `json:"difficulty"`
	Zone       string `json:"zone"`
	StartTime  string `json:"startTime"`
	EndTime    string `json:"endTime"`
	Expire     int64  `json:"expire"`
	Prefix     int    `json:"prefix"`
	Suffix     int    `json:"suffix"`
}

type tempestRating struct {
	Upvotes int
	Votes   int
}

type tempestVote struct {
	Prefix int
	Suffix int
	Rating int
}

var tempests []*Tempest
var hub *UserHub
var prefixRatings []*tempestRating
var suffixRatings []*tempestRating
var tempLock sync.Mutex

func init() {
	hub = &UserHub{}
	tempests = make([]*Tempest, 0)
	prefixRatings = make([]*tempestRating, 40)
	suffixRatings = make([]*tempestRating, 19)

	for i := 0; i < len(prefixRatings); i++ {
		prefixRatings[i] = &tempestRating{}
	}

	for i := 0; i < len(suffixRatings); i++ {
		suffixRatings[i] = &tempestRating{}
	}

	go func() {
		tick := time.NewTicker(5 * time.Minute)
		for {
			<-tick.C

			func() {
				tempLock.Lock()
				defer tempLock.Unlock()
				now := time.Now().UnixNano() / 1000000

				for i := len(tempests) - 1; i >= 0; i-- {
					if tempests[i].Expire < now {
						tempests = append(tempests[:i], tempests[i+1:]...)
					}
				}
			}()
		}
	}()

}

func main() {

	http.HandleFunc("/vote", handleVote)
	http.HandleFunc("/tempest", handleTempests)
	http.HandleFunc("/es", eventSource)
	http.Handle("/", http.FileServer(http.Dir("static")))
	http.ListenAndServe(":80", nil)

}
