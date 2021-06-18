export interface Account {
    BillingAccountName: string,
    subAccounts: SubAccount []
}

export interface SubAccount {
    BillingID: string,
    ContractType: string,
    ContractPurpose: string,
    ContractID: string,
    Country: string,
    Deployment: string,
    Status: string,
    StageGate1?: string,
    StageGate2?: string,
    StageGate3?: string,
    StageGate4?: string,
}