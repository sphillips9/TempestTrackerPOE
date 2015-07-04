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
}

var tempests []*Tempest
var hub *UserHub
var tempLock sync.Mutex

func init() {
	hub = &UserHub{}
	tempests = make([]*Tempest, 0)

	go func() {
		tick := time.NewTicker(5 * time.Minute)
		for {
			<-tick.C

			func() {
				tempLock.Lock()
				defer tempLock.Unlock()
				now := time.Now().UnixNano() / 1000000

				for i := len(tempests); i >= 0; i-- {
					if tempests[i].Expire < now {
						tempests = append(tempests[:i], tempests[i+1:]...)
					}
				}
			}()
		}
	}()

}

func main() {

	http.HandleFunc("/tempest", handleTempests)
	http.HandleFunc("/es", eventSource)
	http.Handle("/", http.FileServer(http.Dir("static")))
	http.ListenAndServe(":555", nil)

}
