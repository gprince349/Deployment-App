package controllers

import (
	"context"
	"fmt"
	"log"
	"net/http"

	"github.com/AzureAD/microsoft-authentication-library-for-go/apps/public"
	"github.com/gprince349/Deployment-App/analytics-backend/models"
)

type tokenController struct {
}

func newTokencontroller() *tokenController {
	return &tokenController{}
}

func (tc tokenController) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path == "/token" {
		tc.getAccessToken(w)
	} else {
		fmt.Println("Incorrect URL")
	}
}

func (tc tokenController) getAccessToken(w http.ResponseWriter) {
	println("getting token ...")
	w.Header().Set("Content-Type", "text/html; charset=ascii")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type,access-control-allow-origin, access-control-allow-headers")

	publicClientapp, err := public.New(client_id, public.WithAuthority(authority))
	if err != nil {
		fmt.Println(err)
	}
	result, err := publicClientapp.AcquireTokenByUsernamePassword(context.TODO(), scopes, username, password)
	if err != nil {
		log.Fatal(err)
		fmt.Println(err)
	}

	accessTokenstr := result.AccessToken
	obj := models.NewToken(string(accessTokenstr))
	encodeResponseAsJSON(obj, w)
	fmt.Println("token sent successfully")
	// w.Write([]byte(accessToken))
}
