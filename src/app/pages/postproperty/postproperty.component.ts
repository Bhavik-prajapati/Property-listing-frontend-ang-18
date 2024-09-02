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
      const formData = new FormData();
  
      formData.append('title', this.property.title);
      formData.append('description', this.property.description);
      formData.append('price', this.property.price);
      formData.append('latitude', this.property.latitude);
      formData.append('longitude', this.property.longitude);
      formData.append('propertyType', this.property.propertyType);
      
      this.selectedFiles.forEach((file, index) => {
        formData.append(`images`, file, file.name);
      });
  
      formData.append('location', JSON.stringify({
        type: "Point",
        coordinates: [
          parseFloat(this.property.longitude),
          parseFloat(this.property.latitude)
        ] 
      }));
  
      this.postproperty.createproperty(formData).subscribe(
        (res) =>{
          console.log(res)
          debugger;
          alert("saved data successs...");
        },
        (err) => console.log(err)
      );
    } else {
      alert('Please fill all the required fields correctly.');
    }
  }
  
}