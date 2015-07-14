package main

import (
	"net/http"
	"runtime"
	"sync"
	"time"
)

type Tempest struct {
	Id      int
	Minutes int
	Zone    int   `json:"zone"`
	Expire  int64 `json:"expire"`
	Prefix  int   `json:"prefix"`
	Suffix  int   `json:"suffix"`
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

type tempestParty struct {
	TempestId int
	IGN       string
	Text      string
}

type currentRatings struct {
	PrefixRatings []*tempestRating
	SuffixRatings []*tempestRating
}

var tempests []*Tempest
var hub *UserHub

var prefixRatings []*tempestRating
var suffixRatings []*tempestRating
var tempestParties []*tempestParty

var tempLock sync.Mutex
var nextTempestId int

var nextHour time.Time

func tempestReset() {

	tempLock.Lock()
	defer tempLock.Unlock()
}

func init() {

	starttime := time.Now()

	nextHour = starttime.Add(time.Duration(-starttime.Minute()) * time.Minute).Add(time.Duration(-starttime.Second()) * time.Second).Add(time.Hour)

	dif := nextHour.Sub(starttime)
	hourlyTimer := time.NewTicker(dif)

	hub = &UserHub{}
	tempests = make([]*Tempest, 0)
	tempestParties = make([]*tempestParty, 0)
	prefixRatings = make([]*tempestRating, 40)
	suffixRatings = make([]*tempestRating, 19)
	nextTempestId = 1234

	for i := 0; i < len(prefixRatings); i++ {
		prefixRatings[i] = &tempestRating{}
	}

	for i := 0; i < len(suffixRatings); i++ {
		suffixRatings[i] = &tempestRating{}
	}

	go func() {

		for {
			<-hourlyTimer.C

			func() {
				tempLock.Lock()
				defer tempLock.Unlock()

				/*
					now := time.Now().UnixNano() / 1000000

					for i := len(tempests) - 1; i >= 0; i-- {
						if tempests[i].Expire < now {
							tempests = append(tempests[:i], tempests[i+1:]...)
						}
					}
				*/
				tempests = make([]*Tempest, 0)

				nextHour = nextHour.Add(time.Hour)
				hourlyTimer = time.NewTicker(time.Hour)

			}()

		}
	}()

}

func main() {

	runtime.GOMAXPROCS(runtime.NumCPU())

	http.HandleFunc("/vote", handleVote)
	http.HandleFunc("/tempest", handleTempests)
	http.HandleFunc("/party", handleParty)
	http.HandleFunc("/es", eventSource)
	http.Handle("/", http.FileServer(http.Dir("static")))
	http.ListenAndServe(":80", nil)

}
