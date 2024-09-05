import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { jwtDecode } from 'jwt-decode';
import { MypropertiesService } from './myproperties.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

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
  mypropertyservice=inject(MypropertiesService);
  ngOnInit(): void {
  const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwtDecode(token); 
      this.userid=decodedToken.user.id;
      this.mypropertyservice.getmyproperties(this.userid).subscribe((res:any)=>{
        console.log(res)
        this.properties=res;
      },err=>console.log(err))

    } else {
      console.error('Token not found!');
    }
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
}
