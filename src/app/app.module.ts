import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'

import { AppComponent } from './app.component';
import { NavbarComponent } from './nav/navbar.component'
import { HarshilComponent } from './harshil/index'
import { HomeComponent } from './home/home.component'
import { appRoutes } from './routes'


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    HarshilComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
