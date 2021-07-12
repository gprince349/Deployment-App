import { Component } from '@angular/core'
import { DataService } from './data.service'
import { MarkerService } from './mapMarker/marker.service';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';


@Component({
    templateUrl: './d3.component.html',
    styleUrls: ['./d3.styles.css']
})

export class D3Component {
    data: any
    billingAccounts : any
    billingAccountNames: any
    isAccount: boolean = false
    Qaccount: any
    globalAvgTimeDays : number = 0
    globalAvgTimeHours : number = 0
    form = new FormGroup({
        account: new FormControl('', Validators.required)
    });

    get f(){
        return this.form.controls;
    }

    

    submit(){
        this.Qaccount = this.form.value.account
        console.log(this.Qaccount);
        this.isAccount = true
        // console.log(this.isAccount)
        this.route.navigate(['d3/',this.billingAccounts[this.Qaccount]])
    }

    isAccountSet():boolean {
        return (this.isAccount && this.Qaccount !== undefined);
    }

    constructor (private dataserv: DataService, private route: Router, private markerserv: MarkerService) {

    }

    ngOnInit() {
        this.dataserv.getBillingAccountNames().subscribe((data: any) => {
            console.log(data)
            this.billingAccounts = data;
            this.billingAccountNames = Object.keys(data);  
        })
        
        this.dataserv.getglobalAvgStageTime().subscribe((data : any) => {
            for(let key in data){
                this.globalAvgTimeDays += Math.floor(data[key]/25)
                this.globalAvgTimeHours += Math.floor(data[key]%24);
            }
            if(this.globalAvgTimeHours > 24) {
                this.globalAvgTimeDays += Math.floor(this.globalAvgTimeHours/24);
                this.globalAvgTimeHours = Math.floor(this.globalAvgTimeHours%24);
            }
        })
        
    }
}

