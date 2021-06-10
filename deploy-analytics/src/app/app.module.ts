import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { NavComponent } from './nav/nav.component';
import { PowerBIComponent } from './powerbi/powerbi.component';
import { appRoutes } from './routes';

import { DataService, D3Component, BarchartComponent, PieChartComponent, ScatterplotComponent } from './d3/index'

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    PowerBIComponent,
    D3Component,
    BarchartComponent,
    PieChartComponent,
    ScatterplotComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule {

  
 }
