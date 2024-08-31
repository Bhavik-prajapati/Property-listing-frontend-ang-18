import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AllpropertiesService } from './allproperties.service';
import { PropertyCardComponent } from "../../components/property-card/property-card.component";
import { HeaderComponent } from "../../components/header/header.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-allproperties',
  standalone: true,
  imports: [PropertyCardComponent, HeaderComponent,CommonModule],
  templateUrl: './allproperties.component.html',
  styleUrl: './allproperties.component.css'
})
export class AllpropertiesComponent {
  
  properieslist:any;
  router=inject(Router);

  constructor(private allproperties:AllpropertiesService){
    const token=localStorage.getItem("token");
    if(!token)
    {
      this.router.navigateByUrl("login");
    }
    this.getalldata();
  }

  getalldata(){
    this.allproperties.getallproperties().subscribe((res)=>{
      this.properieslist=res;
      console.log(this.properieslist)
    },error=>{
      console.log(error)
    })

  }
}
