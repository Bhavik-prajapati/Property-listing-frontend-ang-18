import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostpropertyService {
  
  constructor(private http:HttpClient) { }

  createproperty(formData:any){
    return this.http.post('http://localhost:5000/properties/', formData,{withCredentials:true});
  }

  getpropertybyid(id:any){
    return this.http.get(`http://localhost:5000/properties/getpropertybyid/${id}`,{});
  }

  updatepropertybyid(id:any,formData:any)
  {   
    return this.http.patch(`http://localhost:5000/users/${id}`,{formData},{});
  }

  
  

}
