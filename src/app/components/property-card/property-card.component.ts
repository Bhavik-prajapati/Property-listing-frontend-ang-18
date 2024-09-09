import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

declare var bootstrap: any;

export interface Property {
  _id: string;
  title: string;
  description: string;
  price: number;
  propertyType: string;
  location: {
    type: string;
    coordinates: [number, number];
  };
  ownerId: string;
  createdAt: string;
  images: string[];
}
@Component({
  selector: 'app-property-card',
  standalone: true,
  imports: [CurrencyPipe,DatePipe,CommonModule,RouterLink],
  templateUrl: './property-card.component.html',
  styleUrl: './property-card.component.css'
})
export class PropertyCardComponent {
  @Input() property!: Property;
   
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
