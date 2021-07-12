import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { NavComponent } from './nav/nav.component';
import { PowerBIComponent } from './powerbi/powerbi.component';
import { appRoutes } from './routes';

import { DataService, D3Component, DoughnutChartComponent, 
  LineChartComponent, AccountService, PieChartComponent, AccountComponent, 
  HBarChartComponent,MarkerService, ContractInfoComponent, AvgStageTimeComponent, 
  ContractService, DeploymentChartComponent,HeatMapComponent, GlobalAvgStageTime, 
  GlobalMapComponent,GlobalContractPurpose, GlobalContractType} from './d3/index'

import { Error404Component } from './errors/error.component';
import { TokenService } from './powerbi/token.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    PowerBIComponent,
    D3Component,
    HomeComponent,
    DoughnutChartComponent,
    LineChartComponent,
    Error404Component,
    AccountComponent,
    PieChartComponent,
    HBarChartComponent,
    ContractInfoComponent,
    AvgStageTimeComponent,
    DeploymentChartComponent,
    HeatMapComponent,
    GlobalAvgStageTime,
    GlobalMapComponent,
    GlobalContractPurpose,
    GlobalContractType
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatTooltipModule
  ],
  providers: [
    DataService,
    TokenService,
    AccountService,
    MarkerService,
    ContractService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  
 }
