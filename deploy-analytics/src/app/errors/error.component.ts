import { Component } from "@angular/core";


@Component({
    template: `
   
    <div class="errorMessage">

    <h1>Error 404</h1>
    <h4>No page exists for requested URL</h4>
    <a [routerLink]="['/home']" class="btn btn-primary">Home</a>
    </div>
  `,
  styles: [`
    .errorMessage { 
      margin-top:150px; 
      font-size: 170px;
      text-align: center; 
    }`]
})
export class Error404Component{
    constructor(){

    }
}