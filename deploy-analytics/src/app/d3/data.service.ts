import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataService {
    constructor(private http: HttpClient) {

    }

    getglobalContractType() {
        return this.http.get<any>("http://localhost:5000/api/globalType")
    }

    getglobalContractPurpose() {
        return this.http.get<any>("http://localhost:5000/api/globalPurpose")
    }

    getglobalAvgTime() {
        return this.http.get<any>("http://localhost:5000/api/globalavgtime");
    }

    getglobalAvgStageTime() {
        return this.http.get<any>("http://localhost:5000/api/globalavgStagetime");
    }
    getCountryData() {
        return this.http.get<any>("http://localhost:5000/api/countries");
    }

    getBillingAccountNames() {
        return this.http.get<any>("http://localhost:5000/api/accounts");
    }

    getHeatMapPurpose() {
        return this.http.get<any>("http://localhost:5000/api/hmpurpose");
    }
}