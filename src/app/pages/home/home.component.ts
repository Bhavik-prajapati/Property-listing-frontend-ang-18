import { Component, inject } from '@angular/core';
import { HomeService } from './home.service';
import { CommonModule, JsonPipe } from '@angular/common';
import { Router } from '@angular/router';
import { Property, PropertyCardComponent } from "../../components/property-card/property-card.component";
import { HeaderComponent } from "../../components/header/header.component";
import { FormsModule } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

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
    const token=localStorage.getItem("token");
    if(!token){
      this.router.navigateByUrl("login");
    }
    this.getalldata();

    homeservice.checkplan().subscribe((res)=>{console.log(res)},err=>console.log(err))
  }

  getalldata() {
    // Show the loading alert
    const loading = Swal.fire({
      title: 'Loading...',
      html: 'Please wait while we fetch the data.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
  
    this.homeservice.getallproperties().subscribe(
      (res: HttpResponse<any>) => {
        Swal.close();
  
        console.log(res.status);
        if (res.status == 401) {
          this.router.navigateByUrl("/login");
        }
        this.properieslist = res.body;
        this.filteredProperties = this.properieslist;
      },
      error => {
        Swal.close();
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong while fetching data!',
        });
      }
    );
  }
  

  onSearch() {
    
    console.log(this.propertyType,"-",this.city,"-",this.searchTerm);

    this.homeservice.searchProperties(this.propertyType,this.city,this.searchTerm).subscribe((res:any)=>
    {
      this.filteredProperties = res;
    }
    ,err=>{

      this.filteredProperties=this.properieslist;

    })

    // if (this.searchTerm.trim() !== '') {
    //   this.filteredProperties = this.properieslist.filter((propert: Property) =>
    //     propert.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
    //     propert.description.toLowerCase().includes(this.searchTerm.toLowerCase())
    //   );
    // } else {
    //   this.filteredProperties = this.properieslist;
    // }
  }


}
