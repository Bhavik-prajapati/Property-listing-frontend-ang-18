import { Component, inject } from '@angular/core';
import { HomeService } from './home.service';
import { CommonModule, JsonPipe } from '@angular/common';
import { Router } from '@angular/router';
import { Property, PropertyCardComponent } from "../../components/property-card/property-card.component";
import { HeaderComponent } from "../../components/header/header.component";
import { FormsModule } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [JsonPipe, PropertyCardComponent, CommonModule, HeaderComponent,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  // properties: Property[] = [];
  properieslist:any;
  city: string = '';
  propertyType: string = '';
  filteredProperties: any[] = [];
  router=inject(Router);
  searchTerm:string='';

  constructor(private homeservice:HomeService){
    this.getalldata();
  }

  getalldata(){
    this.homeservice.getallproperties().subscribe((res: HttpResponse<any>)=>{
      console.log(res.status)
      if(res.status==401){
        this.router.navigateByUrl("/login");
      }
      this.properieslist = res.body;
      this.filteredProperties = this.properieslist;
    },error=>{
      console.log(error)
    })

  }

  onSearch() {
    if (this.searchTerm.trim() !== '') {
      this.filteredProperties = this.properieslist.filter((propert: Property) =>
        propert.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        propert.description.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredProperties = this.properieslist;
    }
  }

}
