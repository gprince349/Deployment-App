package dpt

import (
	"context"
	"fmt"
	"log"
	"math"
	"strconv"
	"time"

	"cloud.google.com/go/datastore"
	"github.com/backendDatastore/contractDetails"
	"google.golang.org/api/iterator"
)

// type timeSlice []time.Time

// func (s timeSlice) Less(i, j int) bool { return s[i].Before(s[j]) }
// func (s timeSlice) Swap(i, j int)      { s[i], s[j] = s[j], s[i] }
// func (s timeSlice) Len() int           { return len(s) }

func GetDeploymentPerStage(billingId string) []StageGateCount {
	var data []StageGateCount
	m := make(map[string]int)
	ctx := context.Background()
	client, err := datastore.NewClient(ctx, "pnsm-dev")
	if err != nil {
		fmt.Println("datastore.NewClient: ", err)
	}
	defer client.Close()

	query := datastore.NewQuery("Contract").Namespace("deployment-status").Filter("BillingID = ", billingId)
	var contractIds []string
	it := client.Run(ctx, query)
	for {
		var cnt ContractDpt
		if _, err := it.Next(&cnt); err == iterator.Done {
			break
		} else if err != nil {
			log.Fatal(err)
		}
		contractIds = append(contractIds, cnt.ContractID)
	}

	for _, cid := range contractIds {
		tmap := setStageCountForEach(cid)
		for k := range tmap {
			_, ok := m[k]
			if ok {
				m[k]++
			} else {
				m[k] = 1
			}
		}
	}

	for k, v := range m {
		d := StageGateCount{k, v}
		data = append(data, d)
	}

	return data
}

func setStageCountForEach(cid string) map[string]int {
	ctx := context.Background()
	client, err := datastore.NewClient(ctx, "pnsm-dev")
	if err != nil {
		fmt.Println("datastore.NewClient: ", err)
	}
	defer client.Close()
	query := datastore.NewQuery("Deployment").Namespace("deployment-status").Filter("ContractID = ", cid)
	tmap := make(map[string]int)
	it := client.Run(ctx, query)
	for {
		var dep Deployment
		if _, err := it.Next(&dep); err == iterator.Done {
			break
		} else if err != nil {
			log.Fatal(err)
		}
		// fmt.Println(cid)
		// fmt.Println(dep.DeploymentName)
		tmap[dep.StageGate] = 1
	}
	return tmap
}

// func GetAvgTimePerDeployment(bid string) map[string]float64 {
// 	ctx := context.Background()
// 	client, err := datastore.NewClient(ctx, "pnsm-dev")
// 	if err != nil {
// 		fmt.Println("datastore.NewClient: ", err)
// 	}
// 	defer client.Close()

// 	// Final Result Variable
// 	fm := make(map[string]float64)
// 	fm["deployment_specs_completed"] = 0.00
// 	fm["deployment_started"] = 0.00
// 	fm["deployment_ready_for_validation"] = 0.00
// 	fm["validation_started"] = 0.00
// 	fm["ready_for_onboarding"] = 0.00

// 	// Util Variables
// 	order := []string{"deployment_specs_completed", "deployment_started", "deployment_ready_for_validation", "validation_started", "ready_for_onboarding", "customer_onboarded"}
// 	stageCounts := []float64{0.00, 0.00, 0.00, 0.00, 0.00}

// 	query := datastore.NewQuery("Contract").Namespace("deployment-status").Filter("BillingID = ", bid)
// 	var contractIds []string
// 	it := client.Run(ctx, query)
// 	for {
// 		var cnt ContractDpt
// 		if _, err := it.Next(&cnt); err == iterator.Done {
// 			break
// 		} else if err != nil {
// 			log.Fatal(err)
// 		}
// 		contractIds = append(contractIds, cnt.ContractID)
// 	}

// 	for _, cid := range contractIds {

// 		// Getting Start Time
// 		var prev time.Time
// 		q := datastore.NewQuery("Deployment").Namespace("deployment-status").Filter("ContractID = ", cid).Limit(1)
// 		it := client.Run(ctx, q)
// 		for i := 0; i < 1; i++ {
// 			var dep Deployment
// 			if _, err := it.Next(&dep); err == iterator.Done {
// 				break
// 			} else if err != nil {
// 				log.Fatal(err)
// 			}
// 			prev = dep.StartDate
// 		}

// 		for k, v := range order {
// 			query := datastore.NewQuery("Deployment").Namespace("deployment-status").Filter("ContractID = ", cid).Filter("StageGate =", v)
// 			it := client.Run(ctx, query)
// 			var stageTimeStamps timeSlice
// 			for {
// 				var dep Deployment
// 				if _, err := it.Next(&dep); err == iterator.Done {
// 					break
// 				} else if err != nil {
// 					log.Fatal(err)
// 				}
// 				// fmt.Println(dep.LatestTimestamp)
// 				stageTimeStamps = append(stageTimeStamps, dep.LatestTimestamp)
// 			}
// 			sort.Sort(stageTimeStamps)
// 			// fmt.Println(stageTimeStamps)
// 			if len(stageTimeStamps) != 0 {
// 				td := stageTimeStamps[len(stageTimeStamps)-1].Sub(prev)
// 				fm[v] += td.Hours()
// 				prev = stageTimeStamps[len(stageTimeStamps)-1]
// 				stageCounts[k]++
// 			}
// 		}
// 	}

// 	for k, v := range order {
// 		fm[v] /= stageCounts[k]
// 	}
// 	// fmt.Println(fm)
// 	for k, v := range fm {
// 		if math.IsNaN(v) {
// 			fm[k] = 0.00
// 		}
// 	}
// 	return fm
// }

func GetContractInfo(cid string) ContractInfo {
	ctx := context.Background()
	client, err := datastore.NewClient(ctx, "pnsm-dev")
	if err != nil {
		fmt.Println("datastore.NewClient: ", err)
	}
	defer client.Close()
	query := datastore.NewQuery("Deployment").Namespace("deployment-status").Filter("ContractID = ", cid)
	var cinfo ContractInfo
	it := client.Run(ctx, query)
	var isactive bool = true
	for {
		var dep Deployment
		if _, err := it.Next(&dep); err == iterator.Done {
			break
		} else if err != nil {
			log.Fatal(err)
		}
		cinfo.ContractID = dep.ContractID
		cinfo.DeploymentName = dep.DeploymentName
		cinfo.Solution = dep.Solution
		cinfo.CreationDate = dep.StartDate
		if isactive {
			isactive = isactive && dep.IsActive
			cinfo.EndDate = dep.EndDate
		}
		s := StageData{dep.StageGate, dep.LatestTimestamp, dep.ErrorStatus}
		cinfo.StagesInfo = append(cinfo.StagesInfo, s)
	}
	return cinfo
}

func HeatMapPurpose() []map[string]map[string]int {
	ctx := context.Background()
	client, err := datastore.NewClient(ctx, "pnsm-dev")
	if err != nil {
		fmt.Println("datastore.NewClient: ", err)
	}
	defer client.Close()

	// query := datastore.NewQuery("ContractDetails").Namespace("deployment-status").Project("ContractPurpose").DistinctOn("ContractPurpose")
	// var diff_puposes []string
	// it := client.Run(ctx, query)
	// for {
	// 	var cd contractDetails.ContractDetails
	// 	if _, err := it.Next(&cd); err == iterator.Done {
	// 		break
	// 	} else if err != nil {
	// 		log.Fatal(err)
	// 	}
	// 	diff_puposes = append(diff_puposes, cd.ContractPurpose)
	// }

	// fmt.Println(diff_puposes)

	var purpose_data = map[string]map[string]int{
		"External Commercial":     make(map[string]int),
		"External Evaluation":     make(map[string]int),
		"External Test/Dev":       make(map[string]int),
		"Internal Demo":           make(map[string]int),
		"Internal Production Use": make(map[string]int),
		"Internal Test/Dev":       make(map[string]int),
		"NOT_DEFINED":             make(map[string]int),
	}

	var type_data = map[string]map[string]int{
		"Cloud Contract":     make(map[string]int),
		"Cloud Contract POC": make(map[string]int),
		"Cloud Contract POV": make(map[string]int),
	}

	purpose_data["External Commercial"]["deployment_specs_completed"] = 0
	purpose_data["External Commercial"]["deployment_started"] = 0
	purpose_data["External Commercial"]["deployment_ready_for_validation"] = 0
	purpose_data["External Commercial"]["validation_started"] = 0
	purpose_data["External Commercial"]["ready_for_onboarding"] = 0
	purpose_data["External Commercial"]["customer_onboarded"] = 0

	purpose_data["External Evaluation"]["deployment_specs_completed"] = 0
	purpose_data["External Evaluation"]["deployment_started"] = 0
	purpose_data["External Evaluation"]["deployment_ready_for_validation"] = 0
	purpose_data["External Evaluation"]["validation_started"] = 0
	purpose_data["External Evaluation"]["ready_for_onboarding"] = 0
	purpose_data["External Evaluation"]["customer_onboarded"] = 0

	purpose_data["External Test/Dev"]["deployment_specs_completed"] = 0
	purpose_data["External Test/Dev"]["deployment_started"] = 0
	purpose_data["External Test/Dev"]["deployment_ready_for_validation"] = 0
	purpose_data["External Test/Dev"]["validation_started"] = 0
	purpose_data["External Test/Dev"]["ready_for_onboarding"] = 0
	purpose_data["External Test/Dev"]["customer_onboarded"] = 0

	purpose_data["Internal Production Use"]["deployment_specs_completed"] = 0
	purpose_data["Internal Production Use"]["deployment_started"] = 0
	purpose_data["Internal Production Use"]["deployment_ready_for_validation"] = 0
	purpose_data["Internal Production Use"]["validation_started"] = 0
	purpose_data["Internal Production Use"]["ready_for_onboarding"] = 0
	purpose_data["Internal Production Use"]["customer_onboarded"] = 0

	purpose_data["Internal Demo"]["deployment_specs_completed"] = 0
	purpose_data["Internal Demo"]["deployment_started"] = 0
	purpose_data["Internal Demo"]["deployment_ready_for_validation"] = 0
	purpose_data["Internal Demo"]["validation_started"] = 0
	purpose_data["Internal Demo"]["ready_for_onboarding"] = 0
	purpose_data["Internal Demo"]["customer_onboarded"] = 0

	purpose_data["Internal Test/Dev"]["deployment_specs_completed"] = 0
	purpose_data["Internal Test/Dev"]["deployment_started"] = 0
	purpose_data["Internal Test/Dev"]["deployment_ready_for_validation"] = 0
	purpose_data["Internal Test/Dev"]["validation_started"] = 0
	purpose_data["Internal Test/Dev"]["ready_for_onboarding"] = 0
	purpose_data["Internal Test/Dev"]["customer_onboarded"] = 0

	purpose_data["NOT_DEFINED"]["deployment_specs_completed"] = 0
	purpose_data["NOT_DEFINED"]["deployment_started"] = 0
	purpose_data["NOT_DEFINED"]["deployment_ready_for_validation"] = 0
	purpose_data["NOT_DEFINED"]["validation_started"] = 0
	purpose_data["NOT_DEFINED"]["ready_for_onboarding"] = 0
	purpose_data["NOT_DEFINED"]["customer_onboarded"] = 0

	// type data initialisation
	type_data["Cloud Contract"]["deployment_specs_completed"] = 0
	type_data["Cloud Contract"]["deployment_started"] = 0
	type_data["Cloud Contract"]["deployment_ready_for_validation"] = 0
	type_data["Cloud Contract"]["validation_started"] = 0
	type_data["Cloud Contract"]["ready_for_onboarding"] = 0
	type_data["Cloud Contract"]["customer_onboarded"] = 0

	type_data["Cloud Contract POC"]["deployment_specs_completed"] = 0
	type_data["Cloud Contract POC"]["deployment_started"] = 0
	type_data["Cloud Contract POC"]["deployment_ready_for_validation"] = 0
	type_data["Cloud Contract POC"]["validation_started"] = 0
	type_data["Cloud Contract POC"]["ready_for_onboarding"] = 0
	type_data["Cloud Contract POC"]["customer_onboarded"] = 0

	type_data["Cloud Contract POV"]["deployment_specs_completed"] = 0
	type_data["Cloud Contract POV"]["deployment_started"] = 0
	type_data["Cloud Contract POV"]["deployment_ready_for_validation"] = 0
	type_data["Cloud Contract POV"]["validation_started"] = 0
	type_data["Cloud Contract POV"]["ready_for_onboarding"] = 0
	type_data["Cloud Contract POV"]["customer_onboarded"] = 0

	order := []string{"deployment_specs_completed", "deployment_started", "deployment_ready_for_validation", "validation_started", "ready_for_onboarding", "customer_onboarded"}

	query := datastore.NewQuery("Deployment").Namespace("deployment-status")
	it := client.Run(ctx, query)
	for {
		var dp Deployment

		if _, err := it.Next(&dp); err == iterator.Done {
			break
		} else if err != nil {
			log.Fatal(err)
		}
		// fmt.Println(dp)
		var temp_purpose_contract string = ""
		var temp_purpose_contract_details string = ""
		var temp_type_contract string = ""
		var temp_type_contract_details string = ""
		cid := dp.ContractID
		q2 := datastore.NewQuery("Contract").Namespace("deployment-status").Filter("ContractID =", cid)
		it2 := client.Run(ctx, q2)
		for {
			var cp ContractDpt
			if _, err := it2.Next(&cp); err == iterator.Done {
				break
			} else if err != nil {
				log.Fatal(err)
			}
			// fmt.Println(cp)
			// fmt.Println()
			// fmt.Println()
			temp_purpose_contract = cp.ContractInfo.ContractPurpose
			temp_type_contract = cp.ContractInfo.ContractType
		}
		key_query := datastore.NewQuery("Contract").Namespace("deployment-status").Filter("ContractID = ", cid).KeysOnly()
		key, err := client.GetAll(ctx, key_query, nil)
		if err != nil {
			fmt.Println("Get Key error", err)
		}
		q3 := datastore.NewQuery("ContractDetails").Namespace("deployment-status").Ancestor(key[0])
		it3 := client.Run(ctx, q3)
		for {
			var cd contractDetails.ContractDetails
			if _, err := it3.Next(&cd); err == iterator.Done {
				break
			} else if err != nil {
				log.Fatal(err)
			}
			temp_purpose_contract_details = cd.ContractPurpose
			temp_type_contract_details = cd.ContractType
		}

		if temp_purpose_contract != "" {
			for i := 0; i < len(order); i++ {
				purpose_data[temp_purpose_contract][order[i]]++
				if order[i] == dp.StageGate {
					break
				}
			}
		} else if temp_purpose_contract_details != "" {
			for i := 0; i < len(order); i++ {
				purpose_data[temp_purpose_contract_details][order[i]]++
				if order[i] == dp.StageGate {
					break
				}
			}
		}

		if temp_type_contract != "" {
			for i := 0; i < len(order); i++ {
				type_data[temp_type_contract][order[i]]++
				if order[i] == dp.StageGate {
					break
				}
			}
		} else if temp_type_contract_details != "" {
			for i := 0; i < len(order); i++ {
				type_data[temp_type_contract_details][order[i]]++
				if order[i] == dp.StageGate {
					break
				}
			}
		}

	}
	var data []map[string]map[string]int
	data = append(data, purpose_data)
	data = append(data, type_data)
	return data
}

func GetGlobalAvgTime() float64 {
	ctx := context.Background()
	client, err := datastore.NewClient(ctx, "pnsm-dev")
	if err != nil {
		fmt.Println("datastore.NewClient: ", err)
	}
	defer client.Close()
	query := datastore.NewQuery("Deployment").Namespace("deployment-status").Filter("StageGate =", "customer_onboarded").KeysOnly()
	keys, err := client.GetAll(ctx, query, nil)
	if err != nil {
		log.Fatal(err)
	}
	var total_time time.Duration
	count := 0.0
	for _, k := range keys {
		var sg1 StageGate
		var sg2 StageGate
		q1 := datastore.NewQuery("StageGate").Namespace("deployment-status").Filter("DeploymentID = ", strconv.FormatInt(k.ID, 10)).Filter("StageGateName =", "DELFI_contract_created_in_portal")
		it1 := client.Run(ctx, q1)
		for {
			if _, err := it1.Next(&sg1); err == iterator.Done {
				break
			} else if err != nil {
				log.Fatal(err)
			}
		}
		q2 := datastore.NewQuery("StageGate").Namespace("deployment-status").Filter("DeploymentID = ", strconv.FormatInt(k.ID, 10)).Filter("StageGateName =", "customer_onboarded")
		it2 := client.Run(ctx, q2)
		for {
			if _, err := it2.Next(&sg2); err == iterator.Done {
				break
			} else if err != nil {
				log.Fatal(err)
			}
		}
		td := sg2.EndDate.Sub(sg1.EndDate)
		total_time += td
		count++
		fmt.Println(td)
	}
	// fmt.Println("Total Time: ", total_time)
	// fmt.Println("Count: ", count)
	// fmt.Println(total_time.Hours() / count)
	return total_time.Hours() / count
}

func GetAvgStageTime() map[string]float64 {

	time_data := map[string]float64{
		"deployment_specs_completed":      0.0,
		"deployment_started":              0.0,
		"deployment_ready_for_validation": 0.0,
		"validation_started":              0.0,
		"ready_for_onboarding":            0.0,
		"customer_onboarded":              0.0,
	}
	count_data := map[string]float64{
		"deployment_specs_completed":      0.0,
		"deployment_started":              0.0,
		"deployment_ready_for_validation": 0.0,
		"validation_started":              0.0,
		"ready_for_onboarding":            0.0,
		"customer_onboarded":              0.0,
	}

	order := map[string]int{
		"DELFI_contract_created_in_portal": 0,
		"deployment_specs_completed":       1,
		"deployment_started":               2,
		"deployment_ready_for_validation":  3,
		"validation_started":               4,
		"ready_for_onboarding":             5,
		"customer_onboarded":               6,
	}

	rev_order := map[int]string{
		0: "DELFI_contract_created_in_portal",
		1: "deployment_specs_completed",
		2: "deployment_started",
		3: "deployment_ready_for_validation",
		4: "validation_started",
		5: "ready_for_onboarding",
		6: "customer_onboarded",
	}

	ctx := context.Background()
	client, err := datastore.NewClient(ctx, "pnsm-dev")
	if err != nil {
		fmt.Println("datastore.NewClient: ", err)
	}
	defer client.Close()
	query := datastore.NewQuery("Deployment").Namespace("deployment-status").KeysOnly()
	keys, err := client.GetAll(ctx, query, nil)
	if err != nil {
		fmt.Println("Key Reading error: ", err)
	}
	for _, k := range keys {
		q := datastore.NewQuery("StageGate").Namespace("deployment-status").Filter("DeploymentID = ", strconv.FormatInt(k.ID, 10))
		temp_stage_times := make([]time.Time, 7)
		it := client.Run(ctx, q)
		for {
			var st StageGate
			if _, err := it.Next(&st); err == iterator.Done {
				break
			} else if err != nil {
				log.Fatal(err)
			}
			temp_stage_times[order[st.StageGateName]] = st.EndDate
		}
		for i := 1; i < len(temp_stage_times); i++ {
			if temp_stage_times[i].IsZero() {
				break
			} else {
				td := temp_stage_times[i].Sub(temp_stage_times[i-1])
				time_data[rev_order[i]] += td.Hours()
				count_data[rev_order[i]] += 1.0
			}
		}
	}
	for k := range time_data {
		time_data[k] = time_data[k] / count_data[k]
	}
	// fmt.Println(time_data)
	return time_data
}

func GetAvgTimePerDeployment(bid string) map[string]float64 {

	time_data := map[string]float64{
		"deployment_specs_completed":      0.0,
		"deployment_started":              0.0,
		"deployment_ready_for_validation": 0.0,
		"validation_started":              0.0,
		"ready_for_onboarding":            0.0,
		"customer_onboarded":              0.0,
	}
	count_data := map[string]float64{
		"deployment_specs_completed":      0.0,
		"deployment_started":              0.0,
		"deployment_ready_for_validation": 0.0,
		"validation_started":              0.0,
		"ready_for_onboarding":            0.0,
		"customer_onboarded":              0.0,
	}

	order := map[string]int{
		"DELFI_contract_created_in_portal": 0,
		"deployment_specs_completed":       1,
		"deployment_started":               2,
		"deployment_ready_for_validation":  3,
		"validation_started":               4,
		"ready_for_onboarding":             5,
		"customer_onboarded":               6,
	}

	rev_order := map[int]string{
		0: "DELFI_contract_created_in_portal",
		1: "deployment_specs_completed",
		2: "deployment_started",
		3: "deployment_ready_for_validation",
		4: "validation_started",
		5: "ready_for_onboarding",
		6: "customer_onboarded",
	}

	ctx := context.Background()
	client, err := datastore.NewClient(ctx, "pnsm-dev")
	if err != nil {
		fmt.Println("datastore.NewClient: ", err)
	}
	defer client.Close()
	qbid := datastore.NewQuery("Contract").Namespace("deployment-status").Filter("BillingID =", bid)
	itbid := client.Run(ctx, qbid)
	for {
		var ct ContractDpt
		if _, err := itbid.Next(&ct); err == iterator.Done {
			break
		} else if err != nil {
			log.Fatal(err)
		}
		query := datastore.NewQuery("Deployment").Namespace("deployment-status").Filter("ContractID =", ct.ContractID).KeysOnly()
		keys, err := client.GetAll(ctx, query, nil)
		if err != nil {
			fmt.Println("Key Reading error: ", err)
		}
		for _, k := range keys {
			q := datastore.NewQuery("StageGate").Namespace("deployment-status").Filter("DeploymentID = ", strconv.FormatInt(k.ID, 10))
			temp_stage_times := make([]time.Time, 7)
			it := client.Run(ctx, q)
			for {
				var st StageGate
				if _, err := it.Next(&st); err == iterator.Done {
					break
				} else if err != nil {
					log.Fatal(err)
				}
				temp_stage_times[order[st.StageGateName]] = st.EndDate
			}
			for i := 1; i < len(temp_stage_times); i++ {
				if temp_stage_times[i].IsZero() {
					break
				} else {
					td := temp_stage_times[i].Sub(temp_stage_times[i-1])
					time_data[rev_order[i]] += td.Hours()
					count_data[rev_order[i]] += 1.0
				}
			}
		}
	}

	for k := range time_data {
		time_data[k] = time_data[k] / count_data[k]
	}

	for k, v := range time_data {
		if math.IsNaN(v) {
			time_data[k] = 0.000001
		}
	}
	fmt.Println(time_data)
	return time_data
}
