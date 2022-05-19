import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = "username";
  password: string = "password";

  success: boolean = false;
  loginError: boolean = false;

  token!: string;
  userid !:string;


  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
  }

  onLoginClicked() {
    this.success = false;
    this.loginError = false;
    this.apiService.login(this.username, this.password).subscribe(data=>{
      this.token = JSON.parse(JSON.stringify(data)).token;
      localStorage.setItem("user_token", this.token);
      localStorage.setItem("username", this.username);
      this.apiService.fetchUserId(this.username, this.token).subscribe(data=>{
        
        
        this.userid = JSON.parse(JSON.stringify(data))._id
        localStorage.setItem("userid", this.userid);
        this.success = true;
        this.router.navigateByUrl("projects/"+this.userid);
      
      });
      
    },
    error => {
      this.loginError = true;

    });
  }

}
