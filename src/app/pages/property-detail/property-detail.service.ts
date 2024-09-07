import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PropertyDetailService {

  constructor(private http:HttpClient) { }

  getpropertybyid(id:any){
    return this.http.get(`http://localhost:5000/properties/getpropertybyid/${id}`,{withCredentials: true});
  }
}
