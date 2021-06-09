import { Routes } from "@angular/router";
import { D3Component } from "./d3/index";
import { HomeComponent } from "./home/home.component";
import { PowerBIComponent } from "./powerbi/powerbi.component";



export const appRoutes:Routes = [
    {path: 'home' , component: HomeComponent},
    {path: 'powerbi', component:PowerBIComponent},
    {path: 'd3', component: D3Component},
    {path: '', redirectTo: '/home', pathMatch:'full'}

]