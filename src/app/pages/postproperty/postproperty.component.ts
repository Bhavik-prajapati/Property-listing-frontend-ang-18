import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule, NgForm } from '@angular/forms';
import { PostpropertyService } from './postproperty.service';
import { CommonModule, JsonPipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { zip } from 'rxjs';

@Component({
  selector: 'app-postproperty',
  standalone: true,
  imports: [HeaderComponent, ReactiveFormsModule, CommonModule, FormsModule,JsonPipe], // CommonModule included
  templateUrl: './postproperty.component.html',
  styleUrls: ['./postproperty.component.css']
})
export class PostpropertyComponent implements OnInit {
  iseditmode:boolean=false;
  property: any = {
    title: '',
    description: '',
    price: '',
    latitude: '',
    longitude: '',
    ownerPhone:'',
    propertyType: '',
    bedrooms:'',
    hall:'',
    kitchens:'',
    bathrooms:'',
    area:'',
    country:'',
    state:'',
    city:'',
    zip:''
  };
  selectedFiles: File[] = [];
  router: Router;
  existingimages: any=[];
  constructor(private postproperty: PostpropertyService, router: Router,private route: ActivatedRoute) {
    this.router = router;
    
  }

  ngOnInit(): void {
    // Access query parameters
    this.route.queryParams.subscribe(queryParams => {
      console.log(queryParams); 
      const id = queryParams['id'];
      console.log('ID from query params:', id);

      this.postproperty.getpropertybyid(id).subscribe((res:any)=>{
        console.log(res)
        this.property=res;
        this.property.latitude=res.location.coordinates[0];
        this.property.longitude=res.location.coordinates[1];
        this.existingimages=res.images || [];
        this.property.country=res.address.country,
        this.property.city=res.address.city
        this.property.state=res.address.state
        this.property.zip=res.address.zip
      },err=>console.log(err))
    });
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
      formData.append('ownerPhone', this.property.ownerPhone);
      formData.append('propertyType', this.property.propertyType);
      formData.append('bedrooms', this.property.bedrooms);
      formData.append('hall', this.property.hall);
      formData.append('kitchens', this.property.kitchens);
      formData.append('bathrooms', this.property.bathrooms);
      formData.append('area', this.property.area);
      formData.append('country', this.property.country);
      formData.append('state', this.property.state);
      formData.append('city', this.property.city);
      formData.append('zip', this.property.zip);

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
          alert("saved data successs...");
          this.router.navigateByUrl("myproperties");
        },
        (err) => console.log(err)
      );
    } else {
      alert('Please fill all the required fields correctly.');
    }
  } 
  
}