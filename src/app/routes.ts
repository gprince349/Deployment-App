import { Routes } from '@angular/router'
import { HomeComponent } from './home/home.component'
import { HarshilComponent } from './harshil/harshil.component'

export const appRoutes: Routes = [
    {path:'harshil',component: HarshilComponent},
    //{path:'ashish',component:},
    {path: '',component: HomeComponent}
]