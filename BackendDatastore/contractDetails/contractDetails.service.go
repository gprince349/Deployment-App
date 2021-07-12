package contractDetails

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/backendDatastore/cors"
)

func handleCountry(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodGet:
		{
			countryData, err := setCountryData()
			if err != nil {
				w.WriteHeader(http.StatusInternalServerError)
				return
			}
			j, err := json.Marshal(countryData)
			if err != nil {
				log.Fatal(err)
			}
			_, err = w.Write(j)
			if err != nil {
				log.Fatal(err)
			}
			return
		}
	default:
		w.WriteHeader(http.StatusMethodNotAllowed)
	}
}

func handleType(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodGet:
		{
			TypeData, err := setTypeData()
			if err != nil {
				w.WriteHeader(http.StatusInternalServerError)
				return
			}
			j, err := json.Marshal(TypeData)
			if err != nil {
				log.Fatal(err)
			}
			_, err = w.Write(j)
			if err != nil {
				log.Fatal(err)
			}
			return
		}
	default:
		w.WriteHeader(http.StatusMethodNotAllowed)
	}
}

func handlePurpose(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodGet:
		{
			PurposeData, err := setPurposeData()
			if err != nil {
				w.WriteHeader(http.StatusInternalServerError)
				return
			}
			j, err := json.Marshal(PurposeData)
			if err != nil {
				log.Fatal(err)
			}
			_, err = w.Write(j)
			if err != nil {
				log.Fatal(err)
			}
			return
		}
	default:
		w.WriteHeader(http.StatusMethodNotAllowed)
	}
}

// Setup Routes
func SetupRoutes(apiBasePath string) {
	countriesHandler := http.HandlerFunc(handleCountry)
	typeHandler := http.HandlerFunc(handleType)
	PurposeHandler := http.HandlerFunc(handlePurpose)
	http.Handle(fmt.Sprintf("%s/countries", apiBasePath), cors.Middleware(countriesHandler))
	http.Handle(fmt.Sprintf("%s/contracttype", apiBasePath), cors.Middleware(typeHandler))
	http.Handle(fmt.Sprintf("%s/contractpurpose", apiBasePath), cors.Middleware(PurposeHandler))
}
