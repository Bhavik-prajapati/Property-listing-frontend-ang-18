import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AllpropertiesService {

  constructor(private http:HttpClient) { }

  getallproperties(){
    return this.http.get("http://localhost:5000/properties/",{
      withCredentials:true
    });
  }
}
