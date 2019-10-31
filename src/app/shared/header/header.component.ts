/*
============================================
; Title: WEB	450	Bob’s	Computer	Repair	Shop
; Author: Ethan Townsend, Lea Trueworthy, Natasha Whitmer, and Jason Sullenger
; Date: 17 October 2019
; Description: End-to-end billing system for Bob's Computer - MEAN stack
;===========================================
*/

import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router, private cookie: CookieService) {
    this.userAdmin()
  }

  isAdmin: boolean = false;
  role: string;

  userAdmin() {
    this.role = this.cookie.get('role')
    console.log(this.role);
    if(this.role == "admin") {
      this.isAdmin = true;
      console.log(this.isAdmin)
    }
    else {
      this.isAdmin = false;
    }
  }

  ngOnInit() {}

  logout() {
    console.log("You have logged out");
    this.cookie.deleteAll();
    this.router.navigate(["/session/login"]);
    this.cookie.delete("isAuthenticated");
  }

  navHome() {
    console.log("Home");
    //modified route to take to home
    this.router.navigate(["./home"]);
  }

  navOrder() {
    console.log("Service Repair");
    // this.router.navigate(["/"]);
  }

  navAbout() {
    console.log("About Us");
    this.router.navigate(["/about-us"]);
  }

  navContact() {
    console.log("Contact Us");
    this.router.navigate(["/contact-us"]);
  }

  userProfile() {
    console.log("User Profile");
    // this.router.navigate(["/"]);
  }

  navManagement() {
    console.log("User Management");
    // modified route to ./user-management
    this.router.navigate(["./user-management/"]);
  }

  // modified to security questions route
  navSecQ() {
    console.log("Security Questions");
    //changed route to ./security-questions
    this.router.navigate(["./security-questions"]);
  }
}
