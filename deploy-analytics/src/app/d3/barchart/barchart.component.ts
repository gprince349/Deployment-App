import { Component, Input, OnInit } from '@angular/core'
import * as d3 from 'd3'
import { DataService } from '../data.service'

@Component({
    selector: 'bar-chart',
    template: `
    <div class = "outset">
        <h5 class = "center">Clients Per Countries</h5>
        <div id = "bar"></div>
    </div>    
    `,
    styleUrls : ['./barchart.component.css']
})

export class BarchartComponent implements OnInit {
    data: any

    private svg;
    private margin = {top: 30, right: 30, bottom: 70, left: 60};
    private width = 360 - this.margin.left - this.margin.right;
    private height = 450 - this.margin.top - this.margin.bottom;

    constructor (private dataserv : DataService) { }

    private createSvg(): void {
        this.svg = d3.select("div#bar")
            .append("svg")
                .attr("width",this.width + this.margin.left + this.margin.right)
                .attr("height", this.height + this.margin.top + this.margin.bottom)
            .append("g")
                .attr("transform", `translate(${this.margin.left}, ${this.margin.top})`)
    }

    private drawBars(): void {

        // X axis
        const x = d3.scaleBand()
            .range([0, this.width ])
            .domain(this.data.map(d => d[0]))
            .padding(0.2);
        this.svg.append("g")
            .attr("transform", `translate(0, ${this.height})`)
            .call(d3.axisBottom(x))
            .selectAll("text")
                .attr("transform","translate(-10,0)rotate(-45)")
                .style("text-anchor","end")
        
        // Add Y axis
        const y = d3.scaleLinear()
            .domain([0,6])
            .range([this.height, 0]);
        this.svg.append("g")
            .call(d3.axisLeft(y));

        // Bars
        this.svg.selectAll("mybar")
            .data(this.data)
            .enter()
            .append("rect")
                .attr("x",d => x(d[0]))
                .attr("y", d => y(d[1]))
                .attr("width", x.bandwidth())
                .attr("height", d => this.height - y(d[1]))
                .attr("fill", "#69b3a2")
    
        this.svg.selectAll("rect")
        .transition()
        .duration(800)
        .attr("y", d => y(d[1]))
        .attr("height", d => this.height - y(d[1]))
        .delay((d,i) => {return i*100})
        
    }


    ngOnInit() {
        this.data = this.dataserv.getCountryData();
        this.createSvg();
        this.drawBars();
    }

}