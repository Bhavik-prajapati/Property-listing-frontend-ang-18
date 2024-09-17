import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http:HttpClient) { }

  getprofiledata(id:any){
    return this.http.get(`http://localhost:5000/users/profile/${id}`);
  }
  updateprofiledata(data:any){
    return this.http.patch(`http://localhost:5000/users/`,data);
  }
}
