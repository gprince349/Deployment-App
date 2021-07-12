import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ContractService {

    constructor(private http: HttpClient) {}

    getContractInfo(cid:string) {
        return this.http.get<any>("http://localhost:5000/api/contractinfo/" + cid);
    }
    
    getDeploymentData(cid:string) {
        return this.http.get<any>("http://localhost:5000/api/dptcinfo/" + cid);
    }
}

// var data = {
// 	"Internal Test/Dev":{
//   	"S1": 20,
//     "S2": 15,
//     "S3": 10,
//     "S4": 10,
//     "S5": 5,
//     "S6":5,
//   },
//   "External Test/Dev":{
//   	"S1": 10,
//     "S2": 5,
//     "S3": 5,
//     "S4": 2,
//     "S5": 0,
//     "S6":0,
//   },
//   "NOT_DEFINED":{
//   	"S1": 10,
//     "S2": 0,
//     "S3": 0,
//     "S4": 0,
//     "S5": 0,
//     "S6":0,
//   },
//   "Internal Production Use":{
//   	"S1": 15,
//     "S2": 12,
//     "S3": 8,
//     "S4": 5,
//     "S5": 4,
//     "S6":1,
//   }
  
// }

// var t_data = []
// for(let key in data) {
// 	let row = key;
//   for(let sub_key in data[key]) {
//   	let col = sub_key;
//     let val = data[key][sub_key];
//     var obj = {"row": col,"col":row,"value":val};
//     t_data.push(obj);
//   }
// }

// console.log(t_data);


// var margin = {top: 30, right: 30, bottom: 30, left: 120},
//   width = 450 - margin.left - margin.right,
//   height = 450 - margin.top - margin.bottom;
  
// var svg = d3.select("#heatmap")
// .append("svg")
//   .attr("width", width + margin.left + margin.right)
//   .attr("height", height + margin.top + margin.bottom)
// .append("g")
//   .attr("transform",
//         "translate(" + margin.left + "," + margin.top + ")");
// var x_vars = Object.keys(data['Internal Test/Dev'])
// var y_vars = Object.keys(data);

// var x = d3.scaleBand()
//     .range([ 0, width ])
//     .domain(x_vars)
//     .padding(0.05);
//   svg.append("g")
//     .style("font-size", 15)
//     .attr("transform", "translate(0," + height + ")")
//     .call(d3.axisBottom(x).tickSize(0))
//     .select(".domain").remove();
    
// // Build Y scales and axis:
//   var y = d3.scaleBand()
//     .range([ height, 0 ])
//     .domain(y_vars)
//     .padding(0.05);
//   svg.append("g")
//     .style("font-size", 10)
//     .call(d3.axisLeft(y).tickSize(0))
//     .select(".domain").remove();
    
//  var myColor = d3.scaleSequential()
//     .interpolator(d3.interpolateInferno)
//     .domain([1,30]);
    
// var mouseover = function(d) {
//     d3.select(this)
//       .style("stroke", "black")
//       .style("opacity", 1)
//   }
  
//   var mousemove = function(d) {
//     tooltip
//       .html("No of Contracts: " + d.value)
//       .style("left", (d3.mouse(this)[0]+70) + "px")
//       .style("top", (d3.mouse(this)[1]) + "px")
//   }
//   var mouseleave = function(d) {
//     d3.select(this)
//       .style("stroke", "none")
//       .style("opacity", 0.8)
//   }
    
    
//  svg.selectAll()
//     .data(t_data)
//     .enter()
//     .append("rect")
//       .attr("x", function(d) { return x(d['row']) })
//       .attr("y", function(d) { return y(d['col']) })
//       .attr("rx", 4)
//       .attr("ry", 4)
//       .attr("width", x.bandwidth() )
//       .attr("height", y.bandwidth() )
//       .style("fill", function(d) { return myColor(d.value)} )
//       .style("stroke-width", 4)
//       .style("stroke", "none")
//       .style("opacity", 0.8)
//     .on("mouseover", mouseover)
//     .on("mouseleave", mouseleave)
//     	.append('title')
//       .text((d) => `Contracts: ${d.value}`);