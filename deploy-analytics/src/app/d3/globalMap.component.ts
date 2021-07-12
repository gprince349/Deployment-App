import { Component, AfterViewInit } from "@angular/core";
import { DataService } from "./data.service";
import { MarkerService } from "./mapMarker/marker.service";
import * as L from 'leaflet';

@Component({
    selector: 'gmap',
    template:
    `
    <div id = "map"></div>
    `
})
export class GlobalMapComponent implements AfterViewInit {

    private map;
    private countrydata;
    private initMap(): void {
        this.map = L.map('map', {
            center: [0.00, 0.00],
            zoom: -10
        });
        const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18,
            minZoom: 1,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        });
      
        tiles.addTo(this.map);
    }

    constructor(private dataserv: DataService, private markerserv: MarkerService) {}

    ngOnInit() {
        this.dataserv.getCountryData().subscribe((data:any) => {
            this.countrydata = data;
            console.log(this.countrydata)
        })
    }

    ngAfterViewInit() {
        this.initMap();
        this.markerserv.makeCountryMarkers(this.map,this.countrydata);
    }

}