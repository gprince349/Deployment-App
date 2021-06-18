package controllers

import (
	"encoding/json"
	"io"
	"net/http"
)

func RegisterControllers() {
	// uc := newUserController()
	tc := newTokencontroller()

	// http.Handle("/users", *uc)
	// http.Handle("/users/", *uc)
	http.Handle("/token", *tc)
}

func encodeResponseAsJSON(data interface{}, w io.Writer) {
	enc := json.NewEncoder(w)
	enc.Encode(data)
}
