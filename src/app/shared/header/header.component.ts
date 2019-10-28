import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private cookie: CookieService) { }

  ngOnInit() {
  }

  logout() {
    console.log('You have logged out');
    this.cookie.deleteAll();
    this.router.navigate(["/session/login"])
    this.cookie.delete('isAuthenticated');
  }

  navHome() {
    console.log("Home")
    this.router.navigate(["/"]);
  }

  navOrder() {
    console.log("Service Repair")
    // this.router.navigate(["/"]);
  }

  navAbout() {
    console.log("About Us")
    // this.router.navigate(["/"]);
  }

  navContact() {
    console.log("Contact Us")
    // this.router.navigate(["/"]);
  }

  userProfile() {
    console.log("User Profile")
    // this.router.navigate(["/"]);
  }

  navManagement() {
    console.log("User Management")
    // this.router.navigate(["/"]);
  }

  navUserList() {
    console.log("User List")
    // this.router.navigate(["/"]);
  }
}
