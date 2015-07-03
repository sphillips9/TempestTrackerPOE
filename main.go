package main

import (
	"encoding/json"
	//	"fmt"
	"io/ioutil"
	"net/http"
)

type Tempest struct {
	Type       string `json:"type"`
	Difficulty string `json:"difficulty"`
	Zone       string `json:"zone"`
	StartTime  string `json:"startTime"`
	EndTime    string `json:"endTime"`
}

var tempests []*Tempest = make([]*Tempest, 0)

func handleTempests(w http.ResponseWriter, req *http.Request) {

	defer req.Body.Close()

	switch req.Method {
	case "POST":

		buffer, err := ioutil.ReadAll(req.Body)
		tempest := &Tempest{}
		err = json.Unmarshal(buffer, &tempest)
		if err != nil {
			//fmt.Println(err.Error())
		} else {
			tempests = append(tempests, tempest)

		}
		w.WriteHeader(200)
	case "GET":
		j, err := json.Marshal(tempests)

		if err == nil {
			w.Write(j)
		}

	}

	/*
		for k, v := range req.Header {
			fmt.Println(k, v)
		}
	*/

}

func main() {

	http.HandleFunc("/tempest", handleTempests)
	http.Handle("/", http.FileServer(http.Dir("static")))
	http.ListenAndServe(":555", nil)

}
