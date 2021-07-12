package contract

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strings"

	"github.com/backendDatastore/cors"
)

const accountsPath = "accounts"

func handleAccountNames(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodGet:
		{
			accounts := GetAccountName()
			j, err := json.Marshal(accounts)
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
		{
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
	}
}

func handleglobalPurpose(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodGet:
		{
			purpose_data := GetGlobalCtrPurpose()
			j, err := json.Marshal(purpose_data)
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
		{
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
	}
}

func handleglobalType(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodGet:
		{
			type_data := GetGlobalCtrType()
			j, err := json.Marshal(type_data)
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
		{
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
	}
}

func singleAccountInfo(w http.ResponseWriter, r *http.Request) {
	urlPathSegments := strings.Split(r.URL.Path, fmt.Sprintf("%s/", accountsPath))
	billingID := urlPathSegments[len(urlPathSegments)-1]
	clientName := GetName(billingID)
	contractList := GetContracts(billingID)
	activeContract := 0
	for _, v := range contractList {
		if isContractActive(v) {
			activeContract++
		}
	}
	data := ClientStartInfo{
		ClientName:      clientName,
		ContractIDs:     contractList,
		ActiveContracts: activeContract,
	}
	// fmt.Println(data)
	switch r.Method {
	case http.MethodGet:
		{
			j, err := json.Marshal(data)
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
		{
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
	}

}

func handlecontractPurpose(w http.ResponseWriter, r *http.Request) {
	urlPathSegments := strings.Split(r.URL.Path, "/")
	billingID := urlPathSegments[len(urlPathSegments)-1]
	// fmt.Println(billingID)
	switch r.Method {
	case http.MethodGet:
		{
			contractPurposeData := GetContractPurposeData(billingID)
			j, err := json.Marshal(contractPurposeData)
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
		{
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
	}
}

func handlecontractType(w http.ResponseWriter, r *http.Request) {
	urlPathSegments := strings.Split(r.URL.Path, "/")
	billingID := urlPathSegments[len(urlPathSegments)-1]
	// fmt.Println(billingID)
	switch r.Method {
	case http.MethodGet:
		{
			contractTypeData := GetContractTypeData(billingID)
			j, err := json.Marshal(contractTypeData)
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
		{
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
	}

}

func handlecountryType(w http.ResponseWriter, r *http.Request) {
	urlPathSegments := strings.Split(r.URL.Path, "/")
	billingID := urlPathSegments[len(urlPathSegments)-1]
	// fmt.Println(billingID)
	switch r.Method {
	case http.MethodGet:
		{
			countryData := GetCountryData(billingID)
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
		{
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
	}

}

func singleContractInfo(w http.ResponseWriter, r *http.Request) {
	urlPathSegments := strings.Split(r.URL.Path, "/")
	cid := urlPathSegments[len(urlPathSegments)-1]
	// fmt.Println(billingID)
	switch r.Method {
	case http.MethodGet:
		{
			contractData := GetContractData(cid)
			j, err := json.Marshal(contractData)
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
		{
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
	}
}

func SetupRoutes(apiBasePath string) {
	accountNamesHandler := http.HandlerFunc(handleAccountNames)
	accountInfoHandler := http.HandlerFunc(singleAccountInfo)
	contractInfoHandler := http.HandlerFunc(singleContractInfo)
	contractPurposeHandler := http.HandlerFunc(handlecontractPurpose)
	contractTypeHandler := http.HandlerFunc(handlecontractType)
	countryTypeHandler := http.HandlerFunc(handlecountryType)
	globalPurposeHandler := http.HandlerFunc(handleglobalPurpose)
	globalTypeHandler := http.HandlerFunc(handleglobalType)
	http.Handle(fmt.Sprintf("%s/accounts", apiBasePath), cors.Middleware(accountNamesHandler))
	http.Handle(fmt.Sprintf("%s/%s/", apiBasePath, accountsPath), cors.Middleware(accountInfoHandler))
	http.Handle(fmt.Sprintf("%s/contractpurpose/", apiBasePath), cors.Middleware(contractPurposeHandler))
	http.Handle(fmt.Sprintf("%s/contracttype/", apiBasePath), cors.Middleware(contractTypeHandler))
	http.Handle(fmt.Sprintf("%s/countrytype/", apiBasePath), cors.Middleware(countryTypeHandler))
	http.Handle(fmt.Sprintf("%s/contractinfo/", apiBasePath), cors.Middleware(contractInfoHandler))
	http.Handle(fmt.Sprintf("%s/globalPurpose", apiBasePath), cors.Middleware(globalPurposeHandler))
	http.Handle(fmt.Sprintf("%s/globalType", apiBasePath), cors.Middleware(globalTypeHandler))
}
