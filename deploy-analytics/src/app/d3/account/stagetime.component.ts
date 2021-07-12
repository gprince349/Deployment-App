import { Component, Input, OnChanges } from '@angular/core'
import { AccountService } from './account.service'
import * as d3 from 'd3'

@Component({
    selector: "avgtime",
    template:
    `
    <h2>Avg Time Per Stage</h2>
    <div id = "data"></div>
    `,
    styles: [
        `
        .tool-back {
            background: whitesmoke;
            border: 2px;        
            border-radius: 6px;         
            border-color: white;
            border-style: solid;
        }
        `
    ]
})

export class AvgStageTimeComponent {
    @Input() bid:string = ''
    data: any

    constructor(private accserv: AccountService){}

    create() {
        var svg = d3.select("#data")
        .append("svg")
            .attr("width", 500)
            .attr("height",200)

        svg.append("rect")
        .attr("x",217)
        .attr("y",0)
        .attr("width",3)
        .attr("height",270)
        .attr("fill","#404040")

        // deployment_specs_completed
        var dur1 = getTime(this.data['deployment_specs_completed'])
        svg.append("text")
        .attr("x",0)
        .attr("y",20)
        .style("font-size",14)
        .text("deployment_specs_completed")

        svg.append("rect")
        .attr("id","d1")
        .attr("x",220)
        .attr("y",0)
        .attr("width",dur1.leadterm)
        .attr("height",30)
        .attr("fill","#bf73ff")

        if(dur1.leadterm != 0) {
            var tooltip = d3.select("#data")
        .append("div")
            .style("position","absolute")
            .style("visibility","hidden")
            .text(`${dur1.months}M${dur1.days}d${dur1.hours}h${dur1.minutes}m${dur1.seconds}s`)
            .attr('class','tool-back')

        d3.select("#d1")
            .on("mouseover",function(event){ return tooltip.style("visibility","visible"); })
            .on("mousemove",function(event){return tooltip.style("top", (event.pageY - 10) + "px").style("right",(event.pageX + 50) + "px");})
            .on("mouseout",function(event){return tooltip.style("visibility","hidden");});
        }

        

        // deployment_started
        var dur2 = getTime(this.data['deployment_started'])
        svg.append("text")
        .attr("x",0)
        .attr("y",80)
        .style("font-size",14)
        .text("deployment_started")

        svg.append("rect")
        .attr("id","d2")
        .attr("x",220)
        .attr("y",60)
        .attr("width",dur2.leadterm)
        .attr("height",30)
        .attr("fill","#ffb6c1")

        if(dur2.leadterm != 0) {
            var tooltip2 = d3.select("#data")
        .append("div")
            .style("position","absolute")
            .style("visibility","hidden")
            .text(`${dur2.months}M${dur2.days}d${dur2.hours}h${dur2.minutes}m${dur2.seconds}s`)
            .attr('class','tool-back')

        d3.select("#d2")
            .on("mouseover",function(event){ return tooltip2.style("visibility","visible"); })
            .on("mousemove",function(event){return tooltip2.style("top", (event.pageY - 10) + "px").style("right",(event.pageX + 20) + "px");})
            .on("mouseout",function(event){return tooltip2.style("visibility","hidden");});
        }
        // Tooltip
        


        // deployment_ready_for_validation
        var dur3 = getTime(this.data['deployment_ready_for_validation'])
        svg.append("text")
        .attr("x",0)
        .attr("y",140)
        .style("font-size",14)
        .text("deployment_ready_for_validation")

        svg.append("rect")
        .attr("id","d3")
        .attr("x",220)
        .attr("y",120)
        .attr("width",dur3.leadterm)
        .attr("height",30)
        .attr("fill","#58e1ab")

        if(dur3.leadterm != 0) {
            var tooltip3 = d3.select("#data")
            .append("div")
                .attr("id","d31")
                .style("position","absolute")
                .style("visibility","hidden")
                .text(`${dur3.months}M${dur3.days}d${dur3.hours}h${dur3.minutes}m${dur3.seconds}s`)
                .attr('class','tool-back')
    
            d3.select("#d3")
                .on("mouseover",function(event){ return tooltip3.style("visibility","visible"); })
                .on("mousemove",function(event){return tooltip3.style("top", (event.pageY - 10) + "px").style("right",(event.pageX + 20) + "px");})
                .on("mouseout",function(event){return tooltip3.style("visibility","hidden");});    
        }
       
        // validation_started
        var dur4 = getTime(this.data['validation_started'])
        svg.append("text")
        .attr("x",0)
        .attr("y",200)
        .style("font-size",14)
        .text("validation_started")

        svg.append("rect")
        .attr("id","d4")
        .attr("x",220)
        .attr("y",180)
        .attr("width",dur4.leadterm)
        .attr("height",30)
        .attr("fill","#e2b870")

        if(dur4.leadterm != 0) {
            var tooltip4 = d3.select("#data")
        .append("div")
            .attr("id","d41")
            .style("position","absolute")
            .style("visibility","hidden")
            .text(`${dur4.months}M${dur4.days}d${dur4.hours}h${dur4.minutes}m${dur4.seconds}s`)
            .attr('class','tool-back')

        d3.select("#d4")
            .on("mouseover",function(event){ return tooltip4.style("visibility","visible"); })
            .on("mousemove",function(event){return tooltip4.style("top", (event.pageY - 10) + "px").style("right",(event.pageX + 20) + "px");})
            .on("mouseout",function(event){return tooltip4.style("visibility","hidden");});
        }
        


        // ready_for_onboarding
        var dur = getTime(this.data['ready_for_onboarding'])
        svg.append("text")
        .attr("x",0)
        .attr("y",260)
        .style("font-size",14)
        .text("ready_for_onboarding")

        svg.append("rect")
        .attr("id","d5")
        .attr("x",220)
        .attr("y",240)
        .attr("width",dur.leadterm)
        .attr("height",30)
        .attr("fill","#a9a2fa")

        if(dur.leadterm != 0){
            var tooltip5 = d3.select("#data")
        .append("div")
            .attr("id","d51")
            .style("position","absolute")
            .style("visibility","hidden")
            .text(`${dur.months}M${dur.days}d${dur.hours}h${dur.minutes}m${dur.seconds}s`)
            .attr('class','tool-back')

        d3.select("#d5")
            .on("mouseover",function(event){ return tooltip5.style("visibility","visible"); })
            .on("mousemove",function(event){return tooltip5.style("top", (event.pageY - 10) + "px").style("right",(event.pageX + 20) + "px");})
            .on("mouseout",function(event){return tooltip5.style("visibility","hidden");});
        }
    }
    ngOnChanges() {
        this.accserv.getAvgStageTime(this.bid).subscribe((data:any) => {
            this.data = data;
            console.log(this.data)
            this.create();
        })

    }

}

function getTime(t:number) {
     let lt = 0
    let months = Math.floor(t/(24*30));
    let days = Math.floor(t/24);
    let hours = Math.floor(t)%24;
    let min = (t - Math.floor(t))*60;
    let sec = Math.floor((min - Math.floor(min))*60);
    min = Math.floor(min);
    if (months !== 0){
        lt = 200 + Math.floor((50/12)*months);
    }
    else if(days !== 0) {
        lt = 150 + Math.floor((50/31)*days);
    }
    else if (hours !== 0)
        lt = 100 + Math.floor((50/24)*hours);
    else if(min !== 0)
        lt = 50 + Math.floor((50/60)*min);
    else if(sec !== 0)
        lt = Math.floor((50/60)*sec);
    var obj = {"months":months,"days":days,"hours":hours,"minutes":min,"seconds":sec,"leadterm":lt}
    return obj;
}