package contract

import (
	"context"
	"fmt"
	"log"

	"cloud.google.com/go/datastore"
	"github.com/backendDatastore/contractDetails"
	"github.com/backendDatastore/dpt"
	"google.golang.org/api/iterator"
)

func GetAccountName() map[string]string {
	ctx := context.Background()
	client, err := datastore.NewClient(ctx, "pnsm-dev")
	if err != nil {
		fmt.Println("datastore.NewClient: ", err)
	}
	defer client.Close()
	query := datastore.NewQuery("Contract").Namespace("deployment-status").DistinctOn("BillingAccountName")
	data := make(map[string]string)
	it := client.Run(ctx, query)
	for {
		var cnt Contract
		if _, err := it.Next(&cnt); err == iterator.Done {
			break
		} else if err != nil {
			log.Fatal(err)
		}
		data[cnt.BillingAccountName] = cnt.BillingID
	}
	return data
}

func GetName(billingId string) string {
	ctx := context.Background()
	client, err := datastore.NewClient(ctx, "pnsm-dev")
	if err != nil {
		fmt.Println("datastore.NewClient: ", err)
	}
	defer client.Close()
	query := datastore.NewQuery("Contract").Namespace("deployment-status").Filter("BillingID =", billingId).Distinct()
	var clientName string
	it := client.Run(ctx, query)
	for {
		var cnt Contract
		if _, err := it.Next(&cnt); err == iterator.Done {
			break
		} else if err != nil {
			log.Fatal(err)
		}
		clientName = cnt.BillingAccountName
	}
	return clientName
}

func GetContracts(billingId string) []string {
	ctx := context.Background()
	client, err := datastore.NewClient(ctx, "pnsm-dev")
	if err != nil {
		fmt.Println("datastore.NewClient: ", err)
	}
	defer client.Close()
	query := datastore.NewQuery("Contract").Namespace("deployment-status").Filter("BillingID = ", billingId)
	var contractList []string
	it := client.Run(ctx, query)
	for {
		var cnt Contract
		if _, err := it.Next(&cnt); err == iterator.Done {
			break
		} else if err != nil {
			log.Fatal(err)
		}
		contractList = append(contractList, cnt.ContractID)
	}
	return contractList
}

func isContractActive(contractId string) bool {
	ctx := context.Background()
	client, err := datastore.NewClient(ctx, "pnsm-dev")
	if err != nil {
		fmt.Println("datastore.NewClient: ", err)
	}
	defer client.Close()
	query := datastore.NewQuery("Deployment").Namespace("deployment-status").Filter("ContractID = ", contractId)
	var res bool = true
	it := client.Run(ctx, query)
	for {
		var cnt dpt.Deployment
		if _, err := it.Next(&cnt); err == iterator.Done {
			break
		} else if err != nil {
			log.Fatal(err)
		}
		res = res && cnt.IsActive
	}
	return res
}

func GetContractPurposeData(billingID string) map[string]int {
	ctx := context.Background()
	client, err := datastore.NewClient(ctx, "pnsm-dev")
	if err != nil {
		fmt.Println("datastore.NewClient: ", err)
	}
	defer client.Close()
	query := datastore.NewQuery("Contract").Namespace("deployment-status").Filter("BillingID = ", billingID)
	data := make(map[string]int)
	it := client.Run(ctx, query)
	for {
		var cnt Contract
		if _, err := it.Next(&cnt); err == iterator.Done {
			break
		} else if err != nil {
			log.Fatal(err)
		}
		_, ok := data[cnt.ContractInfo.ContractPurpose]
		if ok {
			data[cnt.ContractInfo.ContractPurpose]++
		} else {
			data[cnt.ContractInfo.ContractPurpose] = 1
		}
	}
	return data
}

func GetContractTypeData(billingID string) map[string]int {
	ctx := context.Background()
	client, err := datastore.NewClient(ctx, "pnsm-dev")
	if err != nil {
		fmt.Println("datastore.NewClient: ", err)
	}
	defer client.Close()
	query := datastore.NewQuery("Contract").Namespace("deployment-status").Filter("BillingID = ", billingID)
	data := make(map[string]int)
	it := client.Run(ctx, query)
	for {
		var cnt Contract
		if _, err := it.Next(&cnt); err == iterator.Done {
			break
		} else if err != nil {
			log.Fatal(err)
		}
		_, ok := data[cnt.ContractInfo.ContractType]
		if ok {
			data[cnt.ContractInfo.ContractType]++
		} else {
			data[cnt.ContractInfo.ContractType] = 1
		}
	}
	return data
}

func GetCountryData(billingID string) []ContractCountryData {
	ctx := context.Background()
	client, err := datastore.NewClient(ctx, "pnsm-dev")
	if err != nil {
		fmt.Println("datastore.NewClient: ", err)
	}
	defer client.Close()
	query := datastore.NewQuery("Contract").Namespace("deployment-status").Filter("BillingID = ", billingID)
	data := make(map[string]int)
	it := client.Run(ctx, query)
	for {
		var cnt Contract
		if _, err := it.Next(&cnt); err == iterator.Done {
			break
		} else if err != nil {
			log.Fatal(err)
		}
		_, ok := data[cnt.ContractInfo.CountryName]
		if ok {
			data[cnt.ContractInfo.CountryName]++
		} else {
			data[cnt.ContractInfo.CountryName] = 1
		}
	}

	var cdata []ContractCountryData
	for k, v := range data {
		c := ContractCountryData{k, v}
		cdata = append(cdata, c)
	}
	return cdata
}

func GetContractData(cid string) Contract {
	ctx := context.Background()
	client, err := datastore.NewClient(ctx, "pnsm-dev")
	if err != nil {
		fmt.Println("datastore.NewClient: ", err)
	}
	defer client.Close()
	query := datastore.NewQuery("Contract").Namespace("deployment-status").Filter("ContractID =", cid)
	it := client.Run(ctx, query)
	var cnt Contract
	for i := 0; i < 1; i++ {
		if _, err := it.Next(&cnt); err == iterator.Done {
			break
		} else if err != nil {
			log.Fatal(err)
		}
	}
	return cnt
}

func GetGlobalCtrPurpose() map[string]int {
	ctx := context.Background()
	client, err := datastore.NewClient(ctx, "pnsm-dev")
	if err != nil {
		fmt.Println("datastore.NewClient: ", err)
	}
	data := make(map[string]int)
	query := datastore.NewQuery("ContractDetails").Namespace("deployment-status")
	it := client.Run(ctx, query)
	for {
		var ct contractDetails.ContractDetails
		if _, err := it.Next(&ct); err == iterator.Done {
			break
		} else if err != nil {
			log.Fatal(err)
		}
		_, ok := data[ct.ContractPurpose]
		if ok {
			data[ct.ContractPurpose]++
		} else {
			data[ct.ContractPurpose] = 1
		}
	}
	// fmt.Println(data)
	return data
}

func GetGlobalCtrType() map[string]int {
	ctx := context.Background()
	client, err := datastore.NewClient(ctx, "pnsm-dev")
	if err != nil {
		fmt.Println("datastore.NewClient: ", err)
	}
	data := make(map[string]int)
	query := datastore.NewQuery("ContractDetails").Namespace("deployment-status")
	it := client.Run(ctx, query)
	for {
		var ct contractDetails.ContractDetails
		if _, err := it.Next(&ct); err == iterator.Done {
			break
		} else if err != nil {
			log.Fatal(err)
		}
		_, ok := data[ct.ContractType]
		if ok {
			data[ct.ContractType]++
		} else {
			data[ct.ContractType] = 1
		}
	}
	// fmt.Println(data)
	return data
}
