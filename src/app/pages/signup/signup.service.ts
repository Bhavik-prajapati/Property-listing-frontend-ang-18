import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http:HttpClient) { 
  }

  signupuser(userdata:any){
    return this.http.post("http://localhost:5000/users",userdata);
  }

  

}
