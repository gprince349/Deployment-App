package dpt

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strings"

	"github.com/backendDatastore/cors"
)

func handleDeploymentStageCount(w http.ResponseWriter, r *http.Request) {
	urlPathSegments := strings.Split(r.URL.Path, "/")
	billingID := urlPathSegments[len(urlPathSegments)-1]
	switch r.Method {
	case http.MethodGet:
		{
			dptData := GetDeploymentPerStage(billingID)
			j, err := json.Marshal(dptData)
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

func handleAvgTimePerStage(w http.ResponseWriter, r *http.Request) {
	urlPathSegments := strings.Split(r.URL.Path, "/")
	billingID := urlPathSegments[len(urlPathSegments)-1]
	switch r.Method {
	case http.MethodGet:
		{
			dptData := GetAvgTimePerDeployment(billingID)
			j, err := json.Marshal(dptData)
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

func handleContractInfo(w http.ResponseWriter, r *http.Request) {
	urlPathSegments := strings.Split(r.URL.Path, "/")
	contractId := urlPathSegments[len(urlPathSegments)-1]
	switch r.Method {
	case http.MethodGet:
		{
			dptData := GetContractInfo(contractId)
			j, err := json.Marshal(dptData)
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

func handleheatmapPurpose(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodGet:
		{
			PurposeData := HeatMapPurpose()
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

func handleGlobalAvgTime(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodGet:
		{
			AvgData := GetGlobalAvgTime()
			j, err := json.Marshal(AvgData)
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

func handleGlobalAvgStageTime(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodGet:
		{
			AvgData := GetAvgStageTime()
			j, err := json.Marshal(AvgData)
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

func SetupRoutes(apiBasePath string) {
	contractInfoHandler := http.HandlerFunc(handleContractInfo)
	deploymentStageHandler := http.HandlerFunc(handleDeploymentStageCount)
	avgTimePerStageHandler := http.HandlerFunc(handleAvgTimePerStage)
	contractPurposeHeatmap := http.HandlerFunc(handleheatmapPurpose)
	globalAvgTime := http.HandlerFunc(handleGlobalAvgTime)
	globalAvgStageTime := http.HandlerFunc(handleGlobalAvgStageTime)
	http.Handle(fmt.Sprintf("%s/dptStage/", apiBasePath), cors.Middleware(deploymentStageHandler))
	http.Handle(fmt.Sprintf("%s/dptStageTime/", apiBasePath), cors.Middleware(avgTimePerStageHandler))
	http.Handle(fmt.Sprintf("%s/dptcinfo/", apiBasePath), cors.Middleware(contractInfoHandler))
	http.Handle(fmt.Sprintf("%s/hmpurpose", apiBasePath), cors.Middleware(contractPurposeHeatmap))
	http.Handle(fmt.Sprintf("%s/globalavgtime", apiBasePath), cors.Middleware(globalAvgTime))
	http.Handle(fmt.Sprintf("%s/globalavgStagetime", apiBasePath), cors.Middleware(globalAvgStageTime))
}
