import  { Component } from '@angular/core'
import { DataService } from '../data.service'
import * as d3 from 'd3'

@Component({
    selector: 'g-pie',
    template:
    `
    <div style = "font-size:15px; font-weight: bolder">Client Distribution over Contract Purpose</div>
    <div id = "pie" ></div>
    <div id = "legend"></div>
    <script src="https://d3js.org/d3-scale-chromatic.v1.min.js"></script>
    `
})
export class GlobalContractPurpose {
    data: any
    legend_keys : any
    constructor(private dataserv: DataService){}

    // Chart Variable
    svg: any
    // Chart Function
    create() {

        var width = 350;
        var height = 350;
        var margin = 25;

        var radius = Math.min(width,height) / 2 - margin;

        this.svg = d3.select(`#pie`)
        .append("svg")
            .attr("width",width)
            .attr("height",height)
        .append("g")
            .attr("transform","translate(" + width / 2 + "," + height / 2 + ")");

        var color = d3.scaleOrdinal()
            .domain(this.data)
            .range(d3.schemeSet2);

        var pie = d3.pie()
            .value(function(d) {return d[1];});

        var data_ready = pie(this.data);

        console.log("DATA READY", data_ready);
        var arcGen = d3.arc()
            .innerRadius(0)
            .outerRadius(radius)
        
        this.svg
            .selectAll('mySlices')
            .data(data_ready)
            .enter()
            .append('path')
                .attr('d',arcGen)
                .attr('fill',function(d) { return(color(d.data[0])) })
                .attr("stroke","black")
                .style("stroke-width","3px")
                .style("opacity",0.7)
            .append('title')
                .text((d) => d.value);

        var leg_svg = d3.select("#legend")
        .append("svg")
            .attr("width",261)
            .attr("height",this.legend_keys.length*30);
        
        var leg_colors = []
        for(let i = 0;i < this.data.length;i++)
        {
            leg_colors.push(color(this.data[i][0]));
        }

        console.log("Leg Colors :", leg_colors);
        var leg_color = d3.scaleOrdinal()
            .domain(this.legend_keys)
            .range(d3.schemeSet2); 
        
        leg_svg.selectAll("mydots")
        .data(this.legend_keys)
        .enter()
            .append("circle")
                .attr("cx",Math.floor(width/2) - radius)
                .attr("cy", function(d,i){ return 15 + i*25})
                .attr("r", 5)

        leg_svg.selectAll("circle")
        .data(leg_colors)
        .each(function(d,i) {
            d3.select(this)
            .style("fill",leg_colors[i])
        })

        leg_svg.selectAll("mylabels")
            .data(this.legend_keys)
            .enter()
            .append("text")
                .attr("x", Math.floor(width/2) - radius + 15)
                .attr("y", function(d,i){ return 15 + i*25})
            .text(function(d) {return String(d)})
                
    //     leg_svg.selectAll("mylabels")
    //     .data(this.legend_keys)
    //     .each(function(d,i) {
    //         d3.select(this)
    //         .text(d)
    //     })
    //             .style("fill", function(d){ return color(d)})
    //             .text(function(d){ return d})
    // .attr("text-anchor", "left")
    // .style("alignment-baseline", "middle")
    }




    ngOnInit() {
        this.dataserv.getglobalContractPurpose().subscribe((data:any) => {
           this.legend_keys = Object.keys(data);
           console.log("Contract Type Keys: ", this.legend_keys);
           this.data = Object.keys(data).map((key) => [key, data[key]]);
           this.create();
        })
    }
}