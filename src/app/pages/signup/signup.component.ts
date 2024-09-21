import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SignupService } from './signup.service';
import { Router } from '@angular/router';
import { HeaderComponent } from "../../components/header/header.component";

interface UserData {
  name: string;
  email: string;
  password: string;
  phone: string;
  userType: string;
}
// interface SignupResponse {
//   token: string;
// }

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, HeaderComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  constructor(private signupservice:SignupService,private router:Router){
    const token=localStorage.getItem("token");
    if(token)
    {
      this.router.navigateByUrl("home");
    }
  }
  userdata:UserData={
    name:"",
    email:"",
    password:"",
    phone:"",
    userType:""
  }

  register(){
    console.log(this.userdata);
    this.signupservice.signupuser(this.userdata).subscribe((res:any)=>{
      console.log(res);
      // localStorage.setItem("token",res.token);
      this.router.navigateByUrl("login");
    },error=>console.log(error))
  }
}
