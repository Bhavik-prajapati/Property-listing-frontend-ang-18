import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule, NgForm } from '@angular/forms';
import { PostpropertyService } from './postproperty.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-postproperty',
  standalone: true,
  imports: [HeaderComponent, ReactiveFormsModule, CommonModule, FormsModule], // CommonModule included
  templateUrl: './postproperty.component.html',
  styleUrls: ['./postproperty.component.css']
})
export class PostpropertyComponent implements OnInit {
 
  property: any = {
    title: '',
    description: '',
    price: '',
    latitude: '',
    longitude: '',
    propertyType: ''
  };
  selectedFiles: File[] = [];
  router: Router;

  constructor(private postproperty: PostpropertyService, router: Router) {
    this.router = router;
    const token = localStorage.getItem("token");
    if (!token) {
      this.router.navigateByUrl("login");
    }
  }

  ngOnInit(): void {
    // Initialize property if needed
  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFiles = Array.from(event.target.files);
    }
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const propertyData = {
        title: this.property.title,
        description: this.property.description,
        price: this.property.price,
        location: {
          type: "Point",
          coordinates: [parseFloat(this.property.longitude), parseFloat(this.property.latitude)]
        },
        propertyType: this.property.propertyType,
        images: this.selectedFiles.map(file => file.name) 
      };
      console.log('Submitting property data:', propertyData);
      this.postproperty.createproperty(propertyData).subscribe(
        (res) => console.log(res),
        (err) => console.log(err)
      );
    } else {
      alert('Please fill all the required fields correctly.');
    }
  }
}
