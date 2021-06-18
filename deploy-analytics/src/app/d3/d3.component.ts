import { Component } from '@angular/core'
import { DataService } from './data.service'
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
    templateUrl: './d3.component.html',
    styleUrls: ['./d3.styles.css']
})

export class D3Component {
    data: any
    countryData: any
    billingAccounts : any
    isAccount: boolean = false
    Qaccount: any

    form = new FormGroup({
        account: new FormControl('', Validators.required)
    });

    get f(){
        return this.form.controls;
    }

    submit(){
        this.Qaccount = this.form.value.account
        // console.log(this.Qaccount);
        this.isAccount = true
        // console.log(this.isAccount)
    }

    isAccountSet():boolean {
        return (this.isAccount && this.Qaccount !== undefined);
    }
    constructor (private dataserv: DataService) {

    }

    ngOnInit() {
        this.data = this.dataserv.getData();
        this.billingAccounts = this.dataserv.getBillingAccountNames();
        this.countryData = this.dataserv.getCountryData();
        // console.log(this.data);
        // console.log(this.countryData);
        // console.log(this.billingAccounts)
    }
}

