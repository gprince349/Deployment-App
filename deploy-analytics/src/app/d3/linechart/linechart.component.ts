import { Component, Input, OnChanges } from "@angular/core";
import { SubAccount } from '../model'
import * as d3 from 'd3'

interface lineChartData {
    date: Date
    value: number
}

@Component({
    selector: 'line-chart',
    templateUrl: './linechart.component.html',
    styleUrls: ['./linechart.style.css']
})

export class LineChartComponent {
    @Input() subacc: SubAccount
    data: lineChartData[] = []
    private svg

    ngOnChanges() {
        if(this.subacc !== undefined)
        {
            console.log(this.subacc);
        }
        this.setData();
        this.create();
    }

    setData() {
        for(let i = 1;i < 5;i++)
        {
            var d = new Date(this.subacc["StageGate" + i].split(' ')[0])
            let t: lineChartData = {
                date : d,
                value: i
            }
            console.log(this.subacc["StageGate" + i].split(' ')[0])
            this.data.push(t);
        }
        // this.data.push({ "date": Date.parse(this.subacc.StageGate1.split(' ')[0]), "value": 1})
        // this.data.push({ "date": Date.parse(this.subacc.StageGate2.split(' ')[0]), "value": 2})
        // this.data.push({ "date": Date.parse(this.subacc.StageGate3.split(' ')[0]), "value": 3})
        // this.data.push({ "date": Date.parse(this.subacc.StageGate4.split(' ')[0]), "value": 4})

        console.log(this.data)
    }

    create() : void {
        var margin = {top: 10, right: 30, bottom: 30, left: 60},
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;
        this.svg = d3.select("#line")
            .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
            .append("g")
                .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");

        var x = d3.scaleTime()
            .domain(d3.extent(this.data, function (d) { return d.date; }))
                .range([ 0, width ]);
        
        this.svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))

        var y = d3.scaleLinear()
            .domain([0, d3.max(this.data, function(d) { return +d.value; })])
            .range([ height, 0 ]);
        
        this.svg.append("g")
            .call(d3.axisLeft(y));

        this.svg.append("path")
        .datum(this.data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 3.5)
        .attr("d", d3.line()
            .x(function(d) { return x(d['date']) })
            .y(function(d) { return y(+d['value']) })
            )
    }

}