import { Component, Input, OnInit } from '@angular/core'
import * as d3 from 'd3'
import { create } from 'd3';
import { AccountService } from "../account/account.service";

@Component({
    selector: 'hbar-chart',
    template: `
        <h2>Stage Distribution of Contracts</h2>
        <h1 *ngIf = "!isdata" style = "text-align:center;">NO DATA AVAILABLE</h1>
        <svg id = "hbar"></svg>
    `,
})

export class HBarChartComponent {
    @Input() bid:string = ''
    isdata : boolean = true
    data: any
    svg: any
    constructor(private accserv: AccountService) {}

    create() {
        var x_axis_range  = 0
        for(let i = 0;i<this.data.length;i++)
        {
            if(x_axis_range < this.data[i].StageCount){
                x_axis_range = this.data[i].StageCount;
            }
        }
        x_axis_range += 1;

        const margin = {top: 10, right: 10, bottom: 20, left: 180},
        width = 540- margin.left - margin.right,
        height = 200 - margin.top - margin.bottom;

        // append the svg object to the body of the page
        this.svg = d3.select("#hbar")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

        // Add X axis
        const x = d3.scaleLinear()
        .domain([0, x_axis_range])
        .range([ 0, width])
        
        this.svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x))


        // Y axis
        const y = d3.scaleBand()
        .range([ height, 0])
        .domain(this.data.map(d => d.StageGateName))
        .padding(.4);
        
        this.svg.append("g")
        .call(d3.axisLeft(y))

        //Bars
        this.svg.selectAll("myRect")
        .data(this.data)
        .join("rect")
        .attr("x", x(0) )
        .attr("y", d => y(d.StageGateName))
        .attr("width", d => x(d.StageCount))
        .attr("height", y.bandwidth())
        .attr("fill", "#69b3a2")
    }

    ngOnChanges() {
        this.accserv.getStageGateCount(this.bid).subscribe((data:any) => {
            if (data === null) {
                this.isdata = false
                console.log("No data available");
            } else {
                this.data = data;
                this.create();
            }
        })
    }
}