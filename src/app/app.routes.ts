import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { SignupComponent } from './pages/signup/signup.component';
import { PropertyDetailComponent } from './pages/property-detail/property-detail.component';
import { PostpropertyComponent } from './pages/postproperty/postproperty.component';

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
            // { path: 'property', component: PropertyDetailComponent },
            { path: 'property/:id', component: PropertyDetailComponent },
            {path:'postproperty',component:PostpropertyComponent}
        ]
    }
];
