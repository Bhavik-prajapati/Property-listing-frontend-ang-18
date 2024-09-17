import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { SignupComponent } from './pages/signup/signup.component';
import { PropertyDetailComponent } from './pages/property-detail/property-detail.component';
import { PostpropertyComponent } from './pages/postproperty/postproperty.component';
import { AllpropertiesComponent } from './pages/allproperties/allproperties.component';
import { authGuard } from './components/authguard/auth.guard';
import { PaymentGatewayComponent } from './pages/payment-gateway/payment-gateway.component';
import { MypropertiesComponent } from './pages/myproperties/myproperties.component';
import { PlansComponent } from './pages/plans/plans.component';
import { ProfileComponent } from './pages/profile/profile.component';

export const routes: Routes = [
    {
        path: "",
        redirectTo: "signup",
        pathMatch: "full",
    },
    {
        path: "login",
        component: LoginComponent,
    },
    {
        path: "signup",
        component: SignupComponent,
    },
    {
     path: "plans", component:PlansComponent
    },
    {path:"payment",component:PaymentGatewayComponent},
    {
        path: "",
        component: LayoutComponent,
        children: [
            { path: "home", component: HomeComponent, canActivate: [authGuard] },
            { path: "profile", component: ProfileComponent, canActivate: [authGuard] },
            { path: "about", component: AboutComponent, canActivate: [authGuard] },
            { path: "property/:id", component: PropertyDetailComponent, canActivate: [authGuard] },
            { path: "postproperty", component: PostpropertyComponent, canActivate: [authGuard] },
            { path: "allproperties", component: AllpropertiesComponent, canActivate: [authGuard] },
            { path: "myproperties", component: MypropertiesComponent, canActivate: [authGuard] },
        ]
    },
    {
        path: "**",
        redirectTo: "signup",
    }
];
