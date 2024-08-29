import { Component, inject } from '@angular/core';
import { HomeService } from './home.service';
import { CommonModule, JsonPipe } from '@angular/common';
import { Router } from '@angular/router';
import { Property, PropertyCardComponent } from "../property-card/property-card.component";
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [JsonPipe, PropertyCardComponent, CommonModule, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  // properties: Property[] = [];
  properieslist:any;
  router=inject(Router);

  constructor(private homeservice:HomeService){
    const token=localStorage.getItem("token");
    if(!token)
    {
      this.router.navigateByUrl("login");
    }
    this.getalldata();
  }

  getalldata(){
    this.homeservice.getallproperties().subscribe((res)=>{
      this.properieslist=res;
      console.log(this.properieslist)
    },error=>{
      console.log(error)
    })

  }

}
