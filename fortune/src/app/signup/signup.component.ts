import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})


export class SignupComponent implements OnInit {

   username: string = "username";
   password: string = "password";
   confirmation: string = "password";
   confirmationError : boolean = false;

   success: boolean = false;



  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
  }

  passwordMissmatch() {
   
      this.confirmationError =  (this.password != this.confirmation);
    
  }

  onSignupClick() {

    if(!this.confirmationError) {
      this.apiService.signup(this.username, this.password).subscribe( data => this.success = true);
    }
  } 

}
