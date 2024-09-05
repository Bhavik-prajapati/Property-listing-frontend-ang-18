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
}
