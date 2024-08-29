import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { SignupComponent } from './components/signup/signup.component';
import { PropertyDetailComponent } from './components/property-detail/property-detail.component';

export const routes: Routes = [

    {
        path:"",
        redirectTo:"signup",
        pathMatch:"full"
    },
    {
        path:"login",
        component:LoginComponent
    },
    {
        path:"signup",
        component:SignupComponent
    },
    {
        path:"",
        component:LayoutComponent,
        children:[
            {path:"home",component:HomeComponent},
            {path:"about",component:AboutComponent},
            { path: 'property', component: PropertyDetailComponent },
            { path: 'property/:id', component: PropertyDetailComponent },
        ]
    }
];
