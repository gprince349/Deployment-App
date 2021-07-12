import { Component, AfterViewInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { AccountService } from './account.service'
import { MarkerService } from '../mapMarker/marker.service';
import * as L from 'leaflet';



@Component({
    selector: "acc-dash",
    templateUrl: "/accounts.component.html",
    styleUrls: ["/accounts.component.css"]
})

export class AccountComponent {
    BillingID:string
    data: any
    totalContract: any
    contractIds : any

    constructor(private activatedRoute: ActivatedRoute, private accServ: AccountService,private markerserv: MarkerService, private route: Router ) { }

    // Contract Dropdown Form
    form = new FormGroup({
        contract: new FormControl('', Validators.required)
    });

    get f(){
        return this.form.controls;
    }
    
    submit() {
        this.route.navigate(['d3/',this.BillingID,this.form.value.contract])
    }


    // Map Processing
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


    ngOnInit(){
        this.BillingID = this.activatedRoute.snapshot.params['id']
        this.accServ.getClientInfo(this.BillingID).subscribe((data:any) => {
            this.data = data;
            this.totalContract = data.ContractIDs.length;
            this.contractIds = data.ContractIDs;
        })
        this.accServ.getCountryType(this.BillingID).subscribe((data:any) => {
            this.countrydata = data;
            console.log(this.countrydata);
        })
        
    }

    ngAfterViewInit() {
        this.initMap();
        this.markerserv.makeCountryMarkers(this.map,this.countrydata);
    }
}