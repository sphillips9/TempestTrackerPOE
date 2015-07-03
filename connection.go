package main

import (
	"sync"
)

type UserConnection struct {
	Queue chan *UpdatePacket
}

func newUserConnection() *UserConnection {
	r := &UserConnection{}
	r.Queue = make(chan *UpdatePacket, 10)

	return r
}

type UpdatePacket struct {
	Event   string
	Message string
}

type UserHub struct {
	Connections []*UserConnection
	Lock        sync.Mutex
}

func (s *UserHub) Add(user *UserConnection) {
	s.Lock.Lock()
	defer s.Lock.Unlock()

	s.Connections = append(s.Connections, user)
}

func (s *UserHub) Broadcast(update *UpdatePacket) {
	s.Lock.Lock()
	defer s.Lock.Unlock()

	for i := len(s.Connections) - 1; i >= 0; i-- {

		conn := s.Connections[i]
		select {
		case conn.Queue <- update:

		default:
			s.Connections = append(s.Connections[:i], s.Connections[i+1:]...)
		}
	}

}
