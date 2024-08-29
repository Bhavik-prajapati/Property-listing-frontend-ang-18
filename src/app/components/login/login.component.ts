import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from './login.service';
import { JsonPipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,JsonPipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private loginservice:LoginService,private router:Router){
  const token=localStorage.getItem("token");
    if(token)
    {
      this.router.navigateByUrl("home");
    }
  }
  userdata:any={
    email:"",
    password:""
  }

  response:any=""
  login(){
    console.log(this.userdata);
    this.loginservice.login(this.userdata).subscribe((res:any)=>{
      localStorage.setItem("token",res.token);
      this.router.navigateByUrl("home");
    },err=>{  
      console.log(err)
    }
  )

  }


}
