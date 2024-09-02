import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostpropertyService {
  
  constructor(private http:HttpClient) { }

  createproperty(formData:any){
    console.log(formData,"+++++++++");
    return this.http.post('http://localhost:5000/properties/', formData,{withCredentials:true});
  }
}
