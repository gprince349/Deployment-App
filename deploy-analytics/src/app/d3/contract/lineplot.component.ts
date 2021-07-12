import { Component, Input } from "@angular/core";
import { ContractService } from "./contract.service";
import * as d3 from 'd3'

var date_sort_asc = function (date1, date2) {
    if (date1 > date2) return 1;
    if (date1 < date2) return -1;
    return 0;
};


@Component({
    selector: 'line-prog',
    template:`
        <div id = "linechart"></div>
    `,
    styles : [`
    .graph-svg-component {
        background-color: #f5f5f5;
    }
    `]
})

export class DeploymentChartComponent {
    @Input() cid: string = ''
    data:any

    constructor(private cserv: ContractService) {}
    create() {
        var order = {
            1:"deployment_specs_completed",
            2:"deployment_started",
            3:"deployment_ready_for_validation",
            4:"validation_started",
            5:"ready_for_onboarding"
        } 
        var t_data = []
        let d = this.data.CreationDate.split('T')[0]
        t_data.push({stage:"Contract created",date:d,errormsg: "No Error"});
        for(let i = 0;i < this.data.StagesInfo.length;i++) {
            let sd = this.data.StagesInfo[i].StageTimestamp.split('T')[0]
            if(this.data.StagesInfo[i].ErrMessage === undefined){
                t_data.push({stage:this.data.StagesInfo[i].StageName,date:sd,errormsg:"No Error"});
            }
            else {
                t_data.push({stage:this.data.StagesInfo[i].StageName,date:sd,errormsg:this.data.StagesInfo[i].ErrMessage});
            }
            
        }
        console.log("dates",t_data);
        var margin = {top: 10, right: 30, bottom: 30, left: 60},
        width = 760 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

        var svg = d3.select("#linechart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .style("background-color", "#f5f5f5")
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");
        

        var y = d3.scalePoint()
            .domain(t_data.map(d => d.date))
            .range([height,0])
            .padding(0.2);
        svg.append('g')
            .call(d3.axisLeft(y));
        
        var x = d3.scalePoint()
            .domain(t_data.map(d => d.stage))
            .range([0,width])
            .padding(0.5);

        svg.append('g')
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        console.log("TEST value");
        for(let i = 0;i<t_data.length;i++){
            console.log(x(t_data[i].stage),y(t_data[i].date))
        }
        
        svg.append('g')
            .selectAll('dot')
            .data(t_data)
            .enter()
            .append('circle')
                .attr("cx",function(d) { return x(d.stage)})
                .attr("cy",function(d) { return y(d.date) })
                .attr("r", "20")
                .style("fill","#b57d33")
                .style("stroke","#664a26")
                .style("stroke-width","2")
            .append('title')
            .text((d) => `Error: ${d.errormsg}`)
        
        // svg.append("path")
        // .datum(t_data)
        // .attr("fill","none")
        // .attr("stroke","#b57d33")     //#c43a21
        // .attr("stroke-width",3)
        // .attr("d",d3.line()
        //     .x(function(d) {return x(d['stage'])})
        //     .y(function(d) { return y(d['date'])})
        // )

        // Labels
        svg.append("text")
        .attr("transform", "translate(" + (width - 60) + " ," + (height - 10) + ")")
        .style("text-anchor", "middle")
        .text("Stage Gates for Deployment");

        svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0)
        .attr("x",-40)
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("TimeStamps");
    }

    ngOnChanges() {
        this.cserv.getDeploymentData(this.cid).subscribe((data:any) => {
            this.data = data;
            console.log(this.data);
            this.create();
        })
    }

}

