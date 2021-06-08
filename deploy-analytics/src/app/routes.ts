import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { PowerBIComponent } from "./powerbi/powerbi.component";



export const appRoutes:Routes = [
    {path: 'home' , component: HomeComponent},
    {path: 'powerbi', component:PowerBIComponent},
    {path: '', redirectTo: '/home', pathMatch:'full'}

]