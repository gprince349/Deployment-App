package contractDetails

type ContractDetails struct {
	ContractPurpose     string
	ContractType        string
	CountryId           string
	CountryName         string
	DataPartitionsIds   []string
	DataPartitionsNames []string
}

type CountryData struct {
	CountryName    string
	CountryClients int
}

type ContractTypeData struct {
	ContractType  string
	ContractCount int
}

type ContractPurposeData struct {
	ContractPurpose string
	ContractCount   int
}
