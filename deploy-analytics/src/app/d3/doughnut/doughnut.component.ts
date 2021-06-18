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
            .selectAll('allPolylines')
            .data(data_ready)
            .enter()
            .append('polyline')
                .attr("stroke", "black")
                .style("fill", "none")
                .attr("stroke-width", 1)
                .attr('points', function(d) {
                var posA = arc.centroid(d) // line insertion in the slice
                var posB = outerArc.centroid(d) // line break: we use the other arc generator that has been built only for that
                var posC = outerArc.centroid(d); // Label position = almost the same as posB
                var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2 // we need the angle to see if the X position will be at the extreme right or extreme left
                posC[0] = this.radius * 0.95 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
                return [posA, posB, posC]
            })

        this.svg
            .selectAll('allLabels')
            .data(data_ready)
            .enter()
            .append('text')
                .text( function(d) { return d.data['0'] } )
                .attr('transform', function(d) {
                    var pos = outerArc.centroid(d);
                    var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
                    pos[0] = this.radius * 0.99 * (midangle < Math.PI ? 1 : -1);
                    return 'translate(' + pos + ')';
                })
                .style('text-anchor', function(d) {
                    var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
                    return (midangle < Math.PI ? 'start' : 'end')
                })
          
    }

    ngOnInit() {
        this.data = this.dataserv.getContractPurposeData();
        // console.log(this.data);
        this.createSvg();
        this.create();
    }


}