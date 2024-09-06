import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PropertyDetailService } from './property-detail.service';
import { CommonModule, DatePipe } from '@angular/common';

declare var bootstrap: any;

@Component({
  selector: 'app-property-detail',
  standalone: true,
  imports: [DatePipe,CommonModule],
  templateUrl: './property-detail.component.html',
  styleUrl: './property-detail.component.css'
})
export class PropertyDetailComponent {

  goBack() {
    window.history.back(); 
  }

  constructor(private route: ActivatedRoute,private propertyservice:PropertyDetailService) { }
  property:any={};
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.propertyservice.getpropertybyid(id).subscribe((res:any)=>{
      console.log(res);
      this.property=res;
      console.log(this.property)
    },error=>{
      console.log(error)
    })
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


}
