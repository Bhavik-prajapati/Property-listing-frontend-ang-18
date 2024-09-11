  import { HttpClient, HttpResponse } from '@angular/common/http';
  import { Injectable } from '@angular/core';
import { Observable, retryWhen } from 'rxjs';

  @Injectable({
    providedIn: 'root'
  })
  export class HomeService {

    constructor(private http:HttpClient) { }

    getallproperties(): Observable<HttpResponse<any>> {
      return this.http.get('http://localhost:5000/properties/', {
        withCredentials: true,
        observe: 'response', 
      });
    }

    checkplan():Observable<HttpResponse<any>>{
      return this.http.get('http://localhost:5000/users/checkplan',{
        withCredentials:true,
        observe:'response'
      })
    }
  

  }
