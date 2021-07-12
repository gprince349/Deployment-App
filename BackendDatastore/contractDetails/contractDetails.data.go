package contractDetails

import (
	"context"
	"errors"
	"fmt"

	"cloud.google.com/go/datastore"
)

var clientCountries []ContractDetails

func init() {
	ctx := context.Background()
	client, err := datastore.NewClient(ctx, "pnsm-dev")
	if err != nil {
		fmt.Println("datastore.NewClient: ", err)
	}
	defer client.Close()
	query := datastore.NewQuery("ContractDetails").Namespace("deployment-status")
	_, err = client.GetAll(ctx, query, &clientCountries)
	if err != nil {
		fmt.Println("Fetch Contract Details Query Error: ", err)
	}
}

func setCountryData() ([]CountryData, error) {
	CountryMap := make(map[string]int)
	for _, v := range clientCountries {
		if v.CountryName == "" {
			v.CountryName = "NA"
		}
		_, ok := CountryMap[v.CountryName]
		if ok {
			CountryMap[v.CountryName]++
		} else {
			CountryMap[v.CountryName] = 1
		}
	}
	if len(CountryMap) == 0 {
		return nil, errors.New("empty object")
	}
	var data []CountryData
	for k, v := range CountryMap {
		if k != "NA" {
			cd := CountryData{CountryName: k, CountryClients: v}
			data = append(data, cd)
		}

	}
	return data, nil
}

func setTypeData() ([]ContractTypeData, error) {
	TypeMap := make(map[string]int)
	for _, v := range clientCountries {
		if v.ContractType == "" {
			v.ContractType = "NOT_DEFINED"
		}
		_, ok := TypeMap[v.ContractType]
		if ok {
			TypeMap[v.ContractType]++
		} else {
			TypeMap[v.ContractType] = 1
		}
	}
	if len(TypeMap) == 0 {
		return nil, errors.New("empty object")
	}
	var data []ContractTypeData
	for k, v := range TypeMap {
		cd := ContractTypeData{ContractType: k, ContractCount: v}
		data = append(data, cd)
	}
	return data, nil
}

func setPurposeData() ([]ContractPurposeData, error) {
	PurposeMap := make(map[string]int)
	for _, v := range clientCountries {
		if v.ContractPurpose == "" {
			v.ContractPurpose = "NOT_DEFINED"
		}
		_, ok := PurposeMap[v.ContractPurpose]
		if ok {
			PurposeMap[v.ContractPurpose]++
		} else {
			PurposeMap[v.ContractPurpose] = 1
		}
	}
	if len(PurposeMap) == 0 {
		return nil, errors.New("empty object")
	}
	var data []ContractPurposeData
	for k, v := range PurposeMap {
		cd := ContractPurposeData{ContractPurpose: k, ContractCount: v}
		data = append(data, cd)
	}
	return data, nil
}
