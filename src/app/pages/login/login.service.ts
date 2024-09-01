import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  login(userdata:any){
    return this.http.post("http://localhost:5000/users/login",userdata,{withCredentials:true});
  }

}
