import { Component, Inject, inject, OnInit } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { jwtDecode } from 'jwt-decode';
import { MypropertiesService } from './myproperties.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

declare var bootstrap: any;
@Component({
  selector: 'app-myproperties',
  standalone: true,
  imports: [HeaderComponent,FormsModule,CommonModule,RouterLink],
  templateUrl: './myproperties.component.html',
  styleUrls: ['./myproperties.component.css'] // Correct the spelling here
})
export class MypropertiesComponent implements OnInit {
  userid:any;
  properties: any[] = []; 
  nodata:boolean=false;
  mypropertyservice=inject(MypropertiesService);
  router=inject(Router);
  ngOnInit(): void {
  const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwtDecode(token); 
      this.userid=decodedToken.user.id;
      this.getallproperty();

    } else {
      console.error('Token not found!');
    }
  }
  getallproperty(){
    this.mypropertyservice.getmyproperties(this.userid).subscribe((res:any)=>{
      console.log(res)
      this.properties=res;
    },err=>{
      if (err.status === 404) {
        this.nodata = true;
      }
    })
  }

  editProperty(id:any){}
  deleteProperty(id:any){}

  prevSlide(id: string) {
    const element = document.getElementById(`propertyCarousel${id}`);
    if (element) {
      const carousel = new bootstrap.Carousel(element);
      carousel.prev();
    }
  }

  nextSlide(id: string) {
    const element = document.getElementById(`propertyCarousel${id}`);
    if (element) {
      const carousel = new bootstrap.Carousel(element);
      carousel.next();
    }
  }

  editproperty(id:any){
    // this.router.navigateByUrl(`postproperty`)
    this.router.navigate(['postproperty'], { queryParams: { id: id } });
  }
  
  deletepmyproperty(id: string) {
    this.mypropertyservice.deleteproperty(id).subscribe({
      next: (res: any) => {
        if (res) { // Assuming the response contains a status field
          alert("Property deleted successfully.");
        } else {
          alert("Failed to delete property.");
        }
        this.getallproperty();
      },
      error: (err) => {
        console.error('Error deleting property:', err);
        alert("An error occurred while deleting the property.");
      }
    });
  }
  

}
