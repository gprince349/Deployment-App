import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { NavComponent } from './nav/nav.component';
import { PowerBIComponent } from './powerbi/powerbi.component';
import { appRoutes } from './routes';

import { DataService, D3Component, BarchartComponent, DoughnutChartComponent, LineChartComponent, DisplayAccountComponent} from './d3/index'
import { Error404Component } from './errors/error.component';
import { TokenService } from './powerbi/token.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    PowerBIComponent,
    D3Component,
    BarchartComponent,
    HomeComponent,
    DoughnutChartComponent,
    DisplayAccountComponent,
    LineChartComponent,
    Error404Component
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    DataService,
    TokenService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  
 }
