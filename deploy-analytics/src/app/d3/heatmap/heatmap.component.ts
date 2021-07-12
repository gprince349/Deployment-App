import { Component, Input } from "@angular/core";
import { DataService } from "../data.service";
import * as d3 from 'd3'

@Component({
    selector: 'heat-map',
    templateUrl: './heatmap.component.html'
})

export class HeatMapComponent {
    purpose_data: any
    type_data: any
    constructor(private dataserv: DataService) {}

    create_purpose() {
        var order_map = {
            "deployment_specs_completed": "S1", 
            "deployment_started": "S2", 
            "deployment_ready_for_validation":"S3", 
            "validation_started":"S4", 
            "ready_for_onboarding":"S5", 
            "customer_onboarded": "S6"
        }
        var t_data = []
        for(let key in this.purpose_data) {
            let row = key;
            for(let sub_key in this.purpose_data[key]) {
                let col = order_map[sub_key];
                let val = this.purpose_data[key][sub_key];
                var obj = {"row": col,"col":row,"value":val};
                t_data.push(obj);
            }
        }

        var margin = {top: 30, right: 30, bottom: 30, left: 120},
        width = 450 - margin.left - margin.right,
        height = 450 - margin.top - margin.bottom;

        var svg = d3.select("#pheatmap")
        .append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
        .append("g")
          .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");
        var x_vars = ["S1","S2","S3","S4","S5","S6"]
        var y_vars = Object.keys(this.purpose_data);

        var x = d3.scaleBand()
            .range([ 0, width ])
            .domain(x_vars)
            .padding(0.05);

        svg.append("g")
            .style("font-size", 15)
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x).tickSize(0))
            .select(".domain").remove();

          var y = d3.scaleBand()
            .range([ height, 0 ])
            .domain(y_vars)
            .padding(0.05);
          svg.append("g")
            .style("font-size", 10)
            .call(d3.axisLeft(y).tickSize(0))
            .select(".domain").remove();
            
         var myColor = d3.scaleSequential()
            .interpolator(d3.interpolateInferno)
            .domain([1,20]);

        var mouseover = function(d) {
                d3.select(this)
                  .style("stroke", "black")
                  .style("opacity", 1)
              }
                
        var mouseleave = function(d) {
            d3.select(this)
                .style("stroke", "none")
                .style("opacity", 0.8)
        }
                        
        svg.selectAll()
        .data(t_data)
        .enter()
        .append("rect")
            .attr("x", function(d) { return x(d['row']) })
            .attr("y", function(d) { return y(d['col']) })
            .attr("rx", 4)
            .attr("ry", 4)
            .attr("width", x.bandwidth() )
            .attr("height", y.bandwidth() )
            .style("fill", function(d) { return myColor(d.value)} )
            .style("stroke-width", 4)
            .style("stroke", "none")
            .style("opacity", 0.8)
        .on("mouseover", mouseover)
        .on("mouseleave", mouseleave)
            .append('title')
        .text((d) => `Contracts: ${d.value}`);

    }

    create_type() {
        var order_map = {
            "deployment_specs_completed": "S1", 
            "deployment_started": "S2", 
            "deployment_ready_for_validation":"S3", 
            "validation_started":"S4", 
            "ready_for_onboarding":"S5", 
            "customer_onboarded": "S6"
        }
        var t_data = []
        for(let key in this.type_data) {
            let row = key;
            for(let sub_key in this.type_data[key]) {
                let col = order_map[sub_key];
                let val = this.type_data[key][sub_key];
                var obj = {"row": col,"col":row,"value":val};
                t_data.push(obj);
            }
        }

        var margin = {top: 30, right: 30, bottom: 30, left: 120},
        width = 450 - margin.left - margin.right,
        height = 450 - margin.top - margin.bottom;

        var svg = d3.select("#theatmap")
        .append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
        .append("g")
          .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");
        var x_vars = ["S1","S2","S3","S4","S5","S6"]
        var y_vars = Object.keys(this.type_data);

        var x = d3.scaleBand()
            .range([ 0, width ])
            .domain(x_vars)
            .padding(0.05);

        svg.append("g")
            .style("font-size", 15)
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x).tickSize(0))
            .select(".domain").remove();

          var y = d3.scaleBand()
            .range([ height, 0 ])
            .domain(y_vars)
            .padding(0.05);
          svg.append("g")
            .style("font-size", 10)
            .call(d3.axisLeft(y).tickSize(0))
            .select(".domain").remove();
            
         var myColor = d3.scaleSequential()
            .interpolator(d3.interpolateInferno)
            .domain([1,20]);

        var mouseover = function(d) {
                d3.select(this)
                  .style("stroke", "black")
                  .style("opacity", 1)
              }
                
        var mouseleave = function(d) {
            d3.select(this)
                .style("stroke", "none")
                .style("opacity", 0.8)
        }
                        
        svg.selectAll()
        .data(t_data)
        .enter()
        .append("rect")
            .attr("x", function(d) { return x(d['row']) })
            .attr("y", function(d) { return y(d['col']) })
            .attr("rx", 4)
            .attr("ry", 4)
            .attr("width", x.bandwidth() )
            .attr("height", y.bandwidth() )
            .style("fill", function(d) { return myColor(d.value)} )
            .style("stroke-width", 4)
            .style("stroke", "none")
            .style("opacity", 0.8)
        .on("mouseover", mouseover)
        .on("mouseleave", mouseleave)
            .append('title')
        .text((d) => `Contracts: ${d.value}`);
    }
    
    ngOnInit(){
        this.dataserv.getHeatMapPurpose().subscribe((data:any) => {
            this.purpose_data = data[0];
            this.type_data = data[1];
            console.log(data);
            this.create_purpose();
            this.create_type();
        })
    }
}