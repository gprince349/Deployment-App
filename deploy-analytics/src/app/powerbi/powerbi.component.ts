import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";


@Component({
    selector: 'powerbi',
    templateUrl: './powerbi.component.html'
})
export class PowerBIComponent implements OnInit{
    @ViewChild('embeddedReport')
    embeddedReport: ElementRef;
    constructor() { }
    ngOnInit() { }
}
