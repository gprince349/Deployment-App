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

	publicClientapp, err := public.New(CLIENT_ID, public.WithAuthority(AUTH_END_POINT+TENANT_ID))
	if err != nil {
		fmt.Println(err)
	}

	//using cache to get access token if available
	var userAccount public.Account
	var accessTokenstr string
	accounts := publicClientapp.Accounts()

	if len(accounts) > 0 {
		fmt.Println("getting into cache")
		userAccount = accounts[0]
		// found a cached account, now see if an applicable token has been cached
		result, err := publicClientapp.AcquireTokenSilent(context.Background(), SCOPES, public.WithSilentAccount(userAccount))
		if err != nil {
			fmt.Println("error in cache part", err)
		}
		accessTokenstr = string(result.AccessToken)
	} else {
		fmt.Println("getting into real server")
		result, err := publicClientapp.AcquireTokenByUsernamePassword(context.TODO(), SCOPES, USERNAME, PASSWORD)
		if err != nil {
			log.Fatal(err)
			fmt.Println(err)
		}

		accessTokenstr = string(result.AccessToken)
	}

	//get embedd url and id using this access token
	embedobj := GetEmbeddDetail(accessTokenstr)

	//encoding data as json and respond to request
	obj := models.NewToken(accessTokenstr, embedobj.GetReportId(), embedobj.GetEmbedurl())
	encodeResponseAsJSON(obj, w)
	fmt.Println("token sent successfully")
}
