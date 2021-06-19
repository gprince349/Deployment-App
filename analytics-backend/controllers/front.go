package controllers

import (
	"encoding/json"
	"fmt"
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
	enc.SetEscapeHTML(false)
	err := enc.Encode(data)
	if err != nil {
		fmt.Print("Error while encoding as JSON", err)
	}
}
