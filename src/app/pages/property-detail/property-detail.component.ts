import { Component, Inject, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PropertyDetailService } from './property-detail.service';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { PaymentService } from '../payment-gateway/payment.service';
import Swal from 'sweetalert2';
import { jwtDecode } from 'jwt-decode';
import { ProfileService } from '../profile/profile.service';

declare var bootstrap: any;
declare var Razorpay: any;

@Component({
  selector: 'app-property-detail',
  standalone: true,
  imports: [DatePipe,CommonModule],
  templateUrl: './property-detail.component.html',
  styleUrl: './property-detail.component.css'
})
export class PropertyDetailComponent implements OnInit{

  goBack() {
    window.history.back(); 
  }

  http=inject(HttpClient);
  profileservice=inject(ProfileService);
  paymentService=inject(PaymentService);
  propertylimit:any=0;
  decodedtoken:any='';
  constructor(private route: ActivatedRoute,private propertyservice:PropertyDetailService) {
    const token = localStorage.getItem("token") || "";
    this.decodedtoken = jwtDecode(token);
  }
  property:any={};
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.propertyservice.getpropertybyid(id).subscribe((res:any)=>{
      this.property=res;
    },error=>{
      console.log(error)
    })

    this.profileservice.getprofiledata(this.decodedtoken.user.id).subscribe(
      (res:any) => {
        console.log(res)
        this.propertylimit=res.propertyLimit;
      },
      (err:any) => console.log(err)
    );

  }

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
   
  viewphone()
  {

    alert(this.propertylimit)
    this.propertylimit-=1;


// 
    // this.profileservice.getprofiledata()

    // this.profileservice.updateprofiledata().subscribe((res)=>{

    this.profileservice.updateprofiledata({propertyLimit:this.propertylimit}).subscribe((res)=>console.log(res),err=>console.log(err))





      // console.log(res)
    // },err=>console.log(err))



  }
}
