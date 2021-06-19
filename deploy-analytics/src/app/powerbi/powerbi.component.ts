import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import * as pbi from 'powerbi-client';
// import { embedReportId, embedUrl } from "../../config";
import { TokenService } from "./token.service";




@Component({
    selector: 'powerbi',
    templateUrl: './powerbi.component.html'
})
export class PowerBIComponent implements OnInit{
    public screenHeight:number; 
    @ViewChild('reportContainer', { static: true }) reportContainer: ElementRef; 


    constructor(private tokenService : TokenService) { 

    }
    
    getToken(){
        this.tokenService.getAccessToken().subscribe((res)=>{
            let accessToken = res["AccessToken"]
            let embedReportId = res["ReportId"]
            console.log(embedReportId)
            let embedUrl = res["EmbedUrl"]
            console.log(embedUrl)
            this.showReport(accessToken, embedReportId, embedUrl)
        }, (error)=>{
            console.log(error)
        })
    }

    ngOnInit() { 
        this.screenHeight = (window.screen.height);  
        this.getToken();  
    }
    
    showReport(accessToken,embedReportId,embedUrl) {  
        // Embed URL    
        //let embedUrl = "https://api.powerbi.com/v1.0/myorg/" + "63a5bb20-0115-43b8-a9a2-607d78eb07ba" + "&groupId=" + "14ecd494-8f09-4e33-b2b1-21ab7e2b9c9e" ;  
        // embedUrl;
        // embedReportId; 
        let config = {  
            type: 'report',  
            accessToken: accessToken,  
            embedUrl: embedUrl,  
            id: embedReportId,  
            settings: {}  
        };  
        let reportContainer = this.reportContainer.nativeElement;  
        let powerbi = new pbi.service.Service(pbi.factories.hpmFactory, pbi.factories.wpmpFactory, pbi.factories.routerFactory);  
        let report = powerbi.embed(reportContainer, config);  
        report.off("loaded");  
        report.on("loaded", () => {  
            console.log("Loaded");  
        });  
        report.on("error", () => {  
            this.getToken();
        });  
    }


}
