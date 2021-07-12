import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import  * as L from 'leaflet';
import { count } from "rxjs/operators";

@Injectable()
export class MarkerService {
    countryDataPath: string = '../../../assets/countryData.json'

    constructor(private http: HttpClient) {

    }

    setRadius(data) {
        var radie = []
        let totalVal: number = 0;
        for(let i = 0;i < data.length;i++){
            totalVal += Number(data[i].CountryClients);
        }
        data.forEach(element => {
            radie.push(10*(Number(element.CountryClients)/totalVal));
        })
        return radie;    
    }
    setCountryData(countryData, data) {
        console.log(data);
        var coord = []
        data.forEach(element => {
            let foundObj = countryData.filter(country => (country.CountryName === capitalize(element.CountryName)))
            let foundCord = new Array(foundObj[0].CapitalLatitude, foundObj[0].CapitalLongitude);
            console.log(foundObj,foundCord);
            coord.push(foundCord);
        });
        return coord;
    }

    makeCapitalPopup(data: any): any {
        let popups = []
        data.forEach(element => {
            popups.push(
                `` + `<div>Country: ${ element.CountryName }</div>` +
                `<div>Contracts: ${ element.CountryClients }</div>`
            )
        })
        return popups;
    }
    makeCountryMarkers(map: L.Map, data): void {
        this.http.get(this.countryDataPath).subscribe((res: any) => {
            let coords = this.setCountryData(res,data);
            console.log("coords",coords);
            let radie = this.setRadius(data);
            console.log("radie",radie);
            let popups = this.makeCapitalPopup(data);
            for(let i = 0;i < coords.length;i++) {
                const circle = L.circleMarker([coords[i][0],coords[i][1]], {
                    radius: radie[i]
                });
                circle.bindPopup(popups[i]);
                circle.addTo(map);
            }
        })
    }
}

function capitalize(str) {
    const arr = str.split(' ');
    return arr.map(str => capString(str)).join(' ');
}

function capString(str) {
    return str.charAt(0).toUpperCase() + str.toLowerCase().slice(1);
}