package contract

import (
	"time"

	"github.com/backendDatastore/contractDetails"
	"github.com/backendDatastore/contractList"
)

type Contract struct {
	BillingAccountName string
	BillingID          string
	ContractID         string
	ContractInfo       contractDetails.ContractDetails
	ContractName       string
	ContractUserList   contractList.ContractList
	CreationDate       time.Time
}

type ClientStartInfo struct {
	ClientName      string
	ContractIDs     []string
	ActiveContracts int
}

type ContractCountryData struct {
	CountryName    string
	CountryClients int
}
