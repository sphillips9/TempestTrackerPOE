package main

import (
	"net/http"
	"sync"
)

type Tempest struct {
	Type       string `json:"type"`
	Difficulty string `json:"difficulty"`
	Zone       string `json:"zone"`
	StartTime  string `json:"startTime"`
	EndTime    string `json:"endTime"`
}

var tempests []*Tempest
var hub *UserHub
var tempLock sync.Mutex

func init() {
	hub = &UserHub{}
	tempests = make([]*Tempest, 0)
}

func main() {

	http.HandleFunc("/tempest", handleTempests)
	http.HandleFunc("/es", eventSource)
	http.Handle("/", http.FileServer(http.Dir("static")))
	http.ListenAndServe(":555", nil)

}
