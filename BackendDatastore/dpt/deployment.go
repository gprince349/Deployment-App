package dpt

import (
	"time"

	"github.com/backendDatastore/contractDetails"
	"github.com/backendDatastore/contractList"
)

type ContractDpt struct {
	BillingAccountName string
	BillingID          string
	ContractID         string
	ContractInfo       contractDetails.ContractDetails
	ContractName       string
	ContractUserList   contractList.ContractList
	CreationDate       time.Time
}

type Deployment struct {
	ContractID        string
	DeploymentName    string
	EndDate           time.Time
	ErrorStatus       Error
	IsActive          bool
	IsDirtyDeployment bool
	LatestRevisionId  string
	LatestTimestamp   time.Time
	Solution          string
	StageGate         string
	StartDate         time.Time
}

type Error struct {
	ErrMessage string
	ErrCode    string
}

type StageGateCount struct {
	StageGateName string
	StageCount    int
}

type StageGateTime struct {
	StageGateName string
	StageGateTime float64
}

type ContractInfo struct {
	ContractID     string
	DeploymentName string
	CreationDate   time.Time
	EndDate        time.Time
	StagesInfo     []StageData
	Solution       string
}

type StageData struct {
	StageName      string
	StageTimestamp time.Time
	StageError     Error
}

type StageGate struct {
	AdditionalStageGateInfo AddStageGatInfo
	DeploymentID            string
	EndDate                 time.Time
	Progress                string
	RevisionId              string
	RevisionTimestamp       time.Time
	StageGateID             string
	StageGateName           string
	StartDate               time.Time
}

type AddStageGatInfo struct {
	InitiatedByEmailAddress string
	InitiatedByUserName     string
}
