import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  islogin:boolean=false;
  router=inject(Router);
  constructor(){
    const token=localStorage.getItem("token");
    if(!token){
      this.islogin=true;
    }else{
      this.islogin=false;
    }
    // if(!token)
    // {
    //   this.router.navigateByUrl("login");
    // }
  }

  logout(){
    localStorage.clear();
    this.router.navigateByUrl("login");
  }
  
}
