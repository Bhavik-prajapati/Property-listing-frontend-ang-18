import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MypropertiesService {

  http=inject(HttpClient);
  constructor() { } 

  getmyproperties(userid:any){
    return this.http.get(`http://localhost:5000/properties/getmyproperty/${userid}`);
  }
  deleteproperty(id:any){
    return this.http.delete(`http://localhost:5000/properties/${id}`);
  }
}
