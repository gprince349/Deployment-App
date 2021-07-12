import { Component } from "@angular/core";
import { DataService } from "./data.service";
import * as d3 from 'd3'

var max_time = 0

@Component({
    selector:'gavg-time',
    template:
    `
    <div id="gavgtime"></div>
    `
})
export class GlobalAvgStageTime {
    data : any
    constructor(private dataserv: DataService){}

    create() {
        for(let key in this.data){
	        max_time = Math.max(Math.floor(this.data[key]),max_time)
        }

        var svg = d3.select("#gavgtime")
            .append("svg")
            .attr("width",500)
            .attr("height",400);
            
        svg.append("rect")
                .attr("x",217)
                .attr("y",0)
                .attr("width",3)
                .attr("height",330)
                .attr("fill","#404040");
        
        var dur1 = getTime(this.data['deployment_specs_completed']);
        svg.append("text")
                .attr("x",0)
                .attr("y",20)
                .style("font-size",14)
                .text("deployment_specs_completed");
                
        svg.append("rect")
                .attr("id","d1")
                .attr("x",220)
                .attr("y",0)
                .attr("width",dur1.leadterm)
                .attr("height",30)
                .attr("fill","#bf73ff")
                .append('title')
                    .text(`${dur1.months}Months ${dur1.days} Days ${dur1.hours} Hours`);
                
        var dur2 = getTime(this.data['deployment_started'])
                svg.append("text")
                .attr("x",0)
                .attr("y",80)
                .style("font-size",14)
                .text("deployment_started");

        svg.append("rect")
        .attr("id","d2")
        .attr("x",220)
        .attr("y",60)
        .attr("width",dur2.leadterm)
        .attr("height",30)
        .attr("fill","#ffb6c1")
        .append('title')
        .text(`${dur2.months}Months ${dur2.days} Days ${dur2.hours} Hours`);
        
        var dur3 = getTime(this.data['deployment_ready_for_validation'])
                svg.append("text")
                .attr("x",0)
                .attr("y",140)
                .style("font-size",14)
                .text("deployment_ready_for_validation");

        svg.append("rect")
        .attr("id","d3")
        .attr("x",220)
        .attr("y",120)
        .attr("width",dur3.leadterm)
        .attr("height",30)
        .attr("fill","#58e1ab")
        .append('title')
        .text(`${dur3.months}Months ${dur3.days} Days ${dur3.hours} Hours`);
        
        
        var dur4 = getTime(this.data['validation_started'])
                svg.append("text")
                .attr("x",0)
                .attr("y",200)
                .style("font-size",14)
                .text("validation_started");

        svg.append("rect")
        .attr("id","d4")
        .attr("x",220)
        .attr("y",180)
        .attr("width",dur4.leadterm)
        .attr("height",30)
        .attr("fill","#e2b870")
        .append('title')
        .text(`${dur4.months}Months ${dur4.days} Days ${dur4.hours} Hours`);
        
        var dur5 = getTime(this.data['ready_for_onboarding'])
        svg.append("text")
        .attr("x",0)
        .attr("y",260)
        .style("font-size",14)
        .text("ready_for_onboarding");

        svg.append("rect")
        .attr("id","d5")
        .attr("x",220)
        .attr("y",240)
        .attr("width",dur5.leadterm)
        .attr("height",30)
        .attr("fill","#a9a2fa")
        .append('title')
        .text(`${dur5.months}Months ${dur5.days} Days ${dur5.hours} Hours`);
        
        var dur6 = getTime(this.data['customer_onboarded'])
        svg.append("text")
        .attr("x",0)
        .attr("y",320)
        .style("font-size",14)
        .text("customer_onboarded");

        svg.append("rect")
        .attr("id","d5")
        .attr("x",220)
        .attr("y",300)
        .attr("width",dur6.leadterm)
        .attr("height",30)
        .attr("fill","#bdbbbb")
        .append('title')
        .text(`${dur6.months}Months ${dur6.days} Days ${dur6.hours} Hours`);
    }

    ngOnInit() {
        this.dataserv.getglobalAvgStageTime().subscribe((data:any) => {
            this.data = data;
            this.create();
        })
    }
}

function getTime(t) {
    let lt = 0
    let months = Math.floor(t/(24*30));
    let days = Math.floor(t/24);
    let hours = Math.floor(t)%24;
    let min = (t - Math.floor(t))*60;
    let sec = Math.floor((min - Math.floor(min))*60);
    min = Math.floor(min);
    lt = Math.floor(Math.floor((t*250))/max_time)
    // console.log(lt)
    var obj = {"months":months,"days":days,"hours":hours,"minutes":min,"seconds":sec,"leadterm":lt}
    return obj;
}