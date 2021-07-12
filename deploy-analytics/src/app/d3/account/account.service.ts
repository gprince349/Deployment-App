import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router'
@Injectable()
export class AccountService {

    constructor (private http: HttpClient, private activatedRoute : ActivatedRoute) {

    }

    getClientInfo(billingId) {
        return this.http.get<any>("http://localhost:5000/api/accounts/" + billingId)
    }

    getContractPurpose(billingId) {
        return this.http.get<any>("http://localhost:5000/api/contractpurpose/" + billingId)
    }
    
    getContractType(billingId) {
        return this.http.get<any>("http://localhost:5000/api/contracttype/" + billingId)
    }

    getCountryType(billingId) {
        return this.http.get<any>("http://localhost:5000/api/countrytype/" + billingId)
    }

    getStageGateCount(billingId) {
        return this.http.get<any>("http://localhost:5000/api/dptStage/" + billingId)
    }

    getAvgStageTime(billingId) {
        return this.http.get<any>("http://localhost:5000/api/dptStageTime/" + billingId)
    }
}