import { Component, Input, OnChanges } from "@angular/core";
import { DataService } from '../data.service'
import { SubAccount  } from "../model";


@Component({
    selector: 'disp-acc',
    templateUrl: './disp-acc.component.html'
})

export class DisplayAccountComponent implements OnChanges {
    subAccounts ?: SubAccount[] = []
    setProgress : boolean = false
    @Input () billingAccount : string = ''

    constructor(private dataserv: DataService) { }

    ngOnChanges() {
        console.log(this.billingAccount);
        if(this.billingAccount)
            this.subAccounts = this.dataserv.getSubAccount(this.billingAccount)
        console.log(this.subAccounts)
    }

    toggleProg() {
        this.setProgress = !this.setProgress
    }
}