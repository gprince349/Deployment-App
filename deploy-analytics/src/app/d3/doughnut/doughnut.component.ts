import { Component, Input, OnChanges } from '@angular/core'
import * as d3 from 'd3'
import { AccountService } from '../account/account.service' 

@Component({
    selector: 'dough-chart',
    template: `
        <script src="https://d3js.org/d3-scale-chromatic.v1.min.js"></script>
        <div id = "dough"></div>  
    `,
    styleUrls: ['./doughnut.component.css']
})

export class DoughnutChartComponent {
    @Input() bid = ''
    data: any
    private svg
    private width = 261
    private height = 250
    private margin = 0
    private radius = Math.min(this.width, this.height) / 2 - this.margin


    constructor(private accserv: AccountService) {}
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
            .attr('fill', function(d){ return(color(d.data[0])) })
            .attr("stroke", "white")
            .style("stroke-width", "2px")
            .style("opacity", 0.7)

        this.svg
            .selectAll('allSlices')
            .data(data_ready)
            .enter()
            .append('text')
            .text(function(d) { return d.data[1]})
            .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
            .style("text-anchor", "middle")
            .style("font-size", 14)        

        var legendRectSize = 8;
        var legendSpacing = 2;
        var legend = this.svg.selectAll('.legend')
            .data(color.domain())
            .enter()
            .append('g')
            .attr('transform',function(d,i)
            {
                var height = legendRectSize + legendSpacing;
                var offset = height*color.domain().length / 2;
                var horz = -7 * legendRectSize;
                var vert = i * height - offset;
                return 'translate(' + horz + ',' + vert + ')';
            });
            
            legend.append('rect')
                .attr('width',legendRectSize)
                .attr('height',legendRectSize)
                .style('fill',color)
                .style('stroke',color);

            legend.append('text')
            .attr('x',legendRectSize + legendSpacing)
            .attr('y',legendRectSize - legendSpacing + 5)
            .text(function(d) { return d; });
            
            legend.selectAll("text")
            .style("font-size",14)
            
          
    }

    ngOnChanges() {
        this.accserv.getContractType(this.bid).subscribe((data:any) => {
            this.data = Object.keys(data).map((key) => [key, data[key]]);
            this.createSvg();
            this.create();
        })
    }


}