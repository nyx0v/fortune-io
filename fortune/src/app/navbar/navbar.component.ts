import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  loggedin: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {

    if(localStorage.getItem('user_token')) this.loggedin = true;

    

  }

  onLogout() {
    localStorage.clear();

    this.loggedin = false;



    this.router.navigateByUrl("auth");

    
  }

  onGotoDashboard() {
    
    this.router.navigateByUrl("projects/"+localStorage.getItem('userid'));
  }



}


