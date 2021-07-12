package main

import (
	"log"
	"net/http"

	"github.com/backendDatastore/contract"
	"github.com/backendDatastore/contractDetails"
	"github.com/backendDatastore/dpt"
)

// "cloud.google.com/go/datastore"

// SIDE NOTES :
// No Concurrency has been handled

// // Practice Func
// type timeSlice []time.Time

// func (s timeSlice) Less(i, j int) bool { return s[i].Before(s[j]) }
// func (s timeSlice) Swap(i, j int)      { s[i], s[j] = s[j], s[i] }
// func (s timeSlice) Len() int           { return len(s) }

// func Practice() {
// 	ctx := context.Background()
// 	client, err := datastore.NewClient(ctx, "pnsm-dev")
// 	if err != nil {
// 		fmt.Println("datastore.NewClient: ", err)
// 	}
// 	defer client.Close()

// 	// Final Result
// 	fm := make(map[string]float64)
// 	fm["deployment_specs_completed"] = 0
// 	fm["deployment_started"] = 0
// 	fm["deployment_ready_for_validation"] = 0
// 	fm["validation_started"] = 0
// 	fm["ready_for_onboarding"] = 0

// 	// Getting Start Time
// 	var prev time.Time
// 	q := datastore.NewQuery("Deployment").Namespace("deployment-status").Filter("ContractID = ", "X-00KS9O").Limit(1)
// 	it := client.Run(ctx, q)
// 	for i := 0; i < 1; i++ {
// 		var dep dpt.Deployment
// 		if _, err := it.Next(&dep); err == iterator.Done {
// 			break
// 		} else if err != nil {
// 			log.Fatal(err)
// 		}
// 		prev = dep.StartDate
// 	}
// 	// fmt.Println(prev)

// 	// Loop over each stage, sort timeStamps and calculate difference between prev and latest sorted timestamp
// 	order := []string{"deployment_specs_completed", "deployment_started", "deployment_ready_for_validation", "validation_started", "ready_for_onboarding"}
// 	stageCounts := []int{0, 0, 0, 0, 0}
// 	for k, v := range order {
// 		query := datastore.NewQuery("Deployment").Namespace("deployment-status").Filter("ContractID = ", "X-00KS9O").Filter("StageGate =", v)
// 		it := client.Run(ctx, query)
// 		var stageTimeStamps timeSlice
// 		for {
// 			var dep dpt.Deployment
// 			if _, err := it.Next(&dep); err == iterator.Done {
// 				break
// 			} else if err != nil {
// 				log.Fatal(err)
// 			}
// 			// fmt.Println(dep.LatestTimestamp)
// 			stageTimeStamps = append(stageTimeStamps, dep.LatestTimestamp)
// 		}
// 		sort.Sort(stageTimeStamps)
// 		// fmt.Println(stageTimeStamps)
// 		if len(stageTimeStamps) != 0 {
// 			td := stageTimeStamps[len(stageTimeStamps)-1].Sub(prev)
// 			fm[v] += td.Hours()
// 			prev = stageTimeStamps[len(stageTimeStamps)-1]
// 			stageCounts[k]++
// 		}
// 	}
// 	for _, v := range fm {
// 		fmt.Println(v)
// 	}
// 	fmt.Println(stageCounts)

// }

// func practicetwo() {
// 	ctx := context.Background()
// 	client, err := datastore.NewClient(ctx, "pnsm-dev")
// 	if err != nil {
// 		fmt.Println("datastore.NewClient: ", err)
// 	}
// 	defer client.Close()
// 	query := datastore.NewQuery("ContractDetails").Namespace("deployment-status").Project("ContractType").DistinctOn("ContractType")
// 	var diff_puposes []string
// 	it := client.Run(ctx, query)
// 	for {
// 		var cd contractDetails.ContractDetails
// 		if _, err := it.Next(&cd); err == iterator.Done {
// 			break
// 		} else if err != nil {
// 			log.Fatal(err)
// 		}
// 		diff_puposes = append(diff_puposes, cd.ContractType)
// 	}

// 	fmt.Println(diff_puposes)
// }

const basePath string = "/api"

// func Practice() {
// 	ctx := context.Background()
// 	client, err := datastore.NewClient(ctx, "pnsm-dev")
// 	if err != nil {
// 		fmt.Println("datastore.NewClient: ", err)
// 	}
// 	defer client.Close()
// 	q := datastore.NewQuery("StageGate").Namespace("deployment-status")
// 	it := client.Run(ctx, q)
// 	for {
// 		var cd contractDetails.ContractDetails
// 		if _, err := it.Next(&cd); err == iterator.Done {
// 			break
// 		} else if err != nil {
// 			log.Fatal(err)
// 		}

// 		fmt.Println(cd.ContractPurpose)
// 	}
// }

// func Gavgtime() {
// 	ctx := context.Background()
// 	client, err := datastore.NewClient(ctx, "pnsm-dev")
// 	if err != nil {
// 		fmt.Println("datastore.NewClient: ", err)
// 	}
// 	defer client.Close()
// 	query := datastore.NewQuery("Deployment").Namespace("deployment-status").Filter("ContractID =", "X-00KS9O").KeysOnly()
// 	keys, err := client.GetAll(ctx, query, nil)
// 	if err != nil {
// 		fmt.Println("Key Reading error: ", err)
// 	}
// 	for _, k := range keys {
// 		fmt.Println("DID: ", k.ID)
// 		q := datastore.NewQuery("StageGate").Namespace("deployment-status").Filter("DeploymentID = ", strconv.FormatInt(k.ID, 10))
// 		it := client.Run(ctx, q)
// 		for {
// 			var si dpt.StageGate
// 			if _, err := it.Next(&si); err == iterator.Done {
// 				break
// 			} else if err != nil {
// 				log.Fatal(err)
// 			}
// 			fmt.Println(si.DeploymentID)
// 		}
// 		fmt.Println()
// 	}

// }

func main() {

	// Practice()
	// practicetwo()
	// dpt.HeatMapPurpose()
	// dpt.GetGlobalAvgTime()
	// Gavgtime()
	// dpt.GetAvgStageTime()
	// dpt.DemoFunc()
	// contract.GetGlobalCtrPurpose()
	// contract.GetGlobalCtrType()

	contract.SetupRoutes(basePath)
	contractDetails.SetupRoutes(basePath)
	dpt.SetupRoutes(basePath)
	err := http.ListenAndServe(":5000", nil)
	if err != nil {
		log.Fatal(err)
	}

}
