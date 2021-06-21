import { Component, Input, OnInit } from '@angular/core'
import * as d3 from 'd3'
import { DataService } from '../data.service'

@Component({
    selector: 'dough-chart',
    template: `
        <div class = "outset">
        <script src="https://d3js.org/d3-scale-chromatic.v1.min.js"></script>
        <h5 class = "center">Client Distribution over Contract Purpose</h5>
        <div id = "dough"></div>
        </div>   
    `,
    styleUrls: ['./doughnut.component.css']
})

export class DoughnutChartComponent  implements OnInit {
    data: any
    private svg
    private width = 450
    private height = 450
    private margin = 40
    private radius = Math.min(this.width, this.height) / 2 - this.margin


    constructor(private dataserv: DataService) {}
    private createSvg() : void {
        this.svg = d3.select("#dough")
            .append("svg")
                .attr("width", this.width)
                .attr("height", this.height)
            .append("g")
                .attr("transform", "translate(" + this.width / 2 + "," + this.height / 2 + ")");
  
    }

    private create() : void  {
        var color = d3.scaleOrdinal()
            .domain(this.data.map((d) => d[0]))
                .range(d3.schemeDark2);

        var pie = d3.pie()
            .sort(null) 
            .value(function(d) {return d[1]; })
        
        var data_ready = pie(this.data)
        // console.log(data_ready);

        var arc = d3.arc()
            .innerRadius(this.radius * 0.5)         
            .outerRadius(this.radius * 0.8)

        var outerArc = d3.arc()
            .innerRadius(this.radius * 0.9)
            .outerRadius(this.radius * 0.9)

        this.svg
            .selectAll('allSlices')
            .data(data_ready)
            .enter()
            .append('path')
            .attr('d', arc)
            .attr('fill', function(d){ return(color(d.data['0'])) })
            .attr("stroke", "white")
            .style("stroke-width", "2px")
            .style("opacity", 0.7)

        this.svg
            .selectAll('allSlices')
            .data(data_ready)
            .enter()
            .append('text')
            .text(function(d) { return d.data['1']})
            .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
            .style("text-anchor", "middle")
            .style("font-size", 17)

        this.svg
        .selectAll('allSlices')
        .data(data_ready)
        .enter()
        .append('text')
        .text(function(d) { return d.data['0']})
        .attr("transform", function(d) { return "translate(" + outerArc.centroid(d) + ")"; })
        .style("text-anchor", "middle")
        .style("font-size", 17)

        // this.svg.append("circle").attr("cx",200).attr("cy",130).attr("r", 6).style("fill", "#1b9e77")
        // this.svg.append("circle").attr("cx",200).attr("cy",130).attr("r", 6).style("fill", "#d95f02")
        // this.svg.append("circle").attr("cx",200).attr("cy",160).attr("r", 6).style("fill", "#7570b3")
        // this.svg.append("text").attr("x", 220).attr("y", 130).text("INTERNAL TEST/DEV").style("font-size", "15px").attr("alignment-baseline","middle")
        // this.svg.append("text").attr("x", 220).attr("y", 130).text("NOT DEFINED").style("font-size", "15px").attr("alignment-baseline","middle")
        // this.svg.append("text").attr("x", 220).attr("y", 160).text("EXTERNAL COMMERCIAL ").style("font-size", "15px").attr("alignment-baseline","middle")

            
          
    }

    ngOnInit() {
        this.data = this.dataserv.getContractPurposeData();
        // console.log(this.data);
        this.createSvg();
        this.create();
    }


}