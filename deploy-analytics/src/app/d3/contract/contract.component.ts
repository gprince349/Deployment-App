import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ContractService } from "./contract.service";

@Component({
    selector:'contract-info',
    templateUrl: './contract.component.html'
})
export class ContractInfoComponent {
    cid: string
    contract : any
    deployment_data : any
    isActive : boolean
    progress_stage: number = 0
    constructor(private cserv: ContractService ,private activatedroute: ActivatedRoute) {

    }

    calcProgress() {
        let order = ["deployment_specs_completed", "deployment_started", "deployment_ready_for_validation", "validation_started", "ready_for_onboarding"]
        let max_stage = 0;
        for(let i = 0;i < order.length;i++){
            for(let j = 0;j<this.deployment_data.StagesInfo.length;j++) {
                if(this.deployment_data.StagesInfo[j].StageName === order[i])
                    max_stage = Math.max(max_stage,i);
            }
        }
        return (max_stage+1)*20;
    }

    ngOnInit() {
        this.cid = this.activatedroute.snapshot.params['idd']
        if (this.cid !== undefined) {
            this.cserv.getContractInfo(this.cid).subscribe((data:any) => {
                this.contract = data;
            })
            this.cserv.getDeploymentData(this.cid).subscribe((data:any) => {
                this.deployment_data = data
                this.isActive = (this.deployment_data.EndDate.split('-')[0] === '0001') ? true:false;
                this.progress_stage = this.calcProgress();
                console.log(this.progress_stage);
            })
        }
    }
}
