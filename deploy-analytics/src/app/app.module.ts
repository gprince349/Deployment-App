import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { NavComponent } from './nav/nav.component';
import { PowerBIComponent } from './powerbi/powerbi.component';
import { appRoutes } from './routes';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    PowerBIComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  
 }
