import { Routes } from "@angular/router";
import { D3Component } from "./d3/index";
import { Error404Component } from "./errors/error.component";
import { HomeComponent } from "./home/home.component";
import { PowerBIComponent } from "./powerbi/powerbi.component";
import { AccountComponent, ContractInfoComponent } from "./d3/index";


export const appRoutes:Routes = [
    {path: 'home' , component: HomeComponent},
    {path: 'powerbi', component:PowerBIComponent},
    {path: 'd3', component: D3Component},
    {path: 'd3/:id', component: AccountComponent},
    {path: 'd3/:id/:idd', component: ContractInfoComponent},
    {path: '', redirectTo: '/home', pathMatch:'full'},
    {path: '', redirectTo: '/home', pathMatch:'full'},
    {path: '404', component: Error404Component},
    {path: '**', redirectTo: '/404'}

]