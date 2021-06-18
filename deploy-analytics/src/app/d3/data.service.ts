import { Injectable } from '@angular/core'
import data from '../../assets/data.json'
import { Account, SubAccount } from './model'

@Injectable()
export class DataService {

    getData() {
        return accounts;
    }

    getCountryData() {
        let countryData = {}
        accounts.forEach((account:Account) => {
            account.subAccounts.forEach((subAccount: SubAccount) => {
                if(subAccount.Country in countryData){
                    countryData[subAccount.Country] += 1;
                }
                else
                {
                    countryData[subAccount.Country] = 1;
                }
            })
        })

        return Object.entries(countryData);
    }

    getContractPurposeData() {
        let contractPurposeData = {}
        accounts.forEach((account: Account) => {
            account.subAccounts.forEach((subAccount: SubAccount) => {
                if(subAccount.ContractPurpose in contractPurposeData)
                {
                    contractPurposeData[subAccount.ContractPurpose] += 1;
                }
                else
                {
                    contractPurposeData[subAccount.ContractPurpose] = 1;
                }
            })
        })

        return Object.entries(contractPurposeData);
    }

    getBillingAccountNames() {
        let billingAccounts = new Set
        accounts.forEach((account: Account) => {
            billingAccounts.add(account.BillingAccountName)
        })

        return [...billingAccounts];
    }

    getSubAccount(billingAccount : string) {
        return (accounts.filter((account: Account) => account.BillingAccountName === billingAccount))[0].subAccounts  
    }

}

const accounts: Account[] = data.accounts;