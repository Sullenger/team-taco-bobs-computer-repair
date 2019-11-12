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
  constructor(private router: Router, private cookie: CookieService) {}

  ngOnInit() {}

  logout() {
    console.log("You have logged out");
    this.cookie.deleteAll();
    this.router.navigate(["/session/login"]);
    this.cookie.delete("isAuthenticated");
  }

  navHome() {
    this.router.navigate(["./home"]);
  }

  navOrder() {
    console.log("Service Repair");
    this.router.navigate(["./service-repair/"]);
  }

  navAbout() {
    this.router.navigate(["./session/about-us"]);
  }

  navContact() {
    this.router.navigate(["./session/contact-us"]);
  }

  userProfile() {
    console.log("User Profile");
    this.router.navigate(["/user-profile"]);
  }

  navManagement() {
    this.router.navigate(["./user-management/"]);
  }

  navRoleConf() {
    this.router.navigate(["./role-configuration/"]);
  }

  navSecQ() {
    this.router.navigate(["./security-questions"]);
  }
  navGraph() {
    this.router.navigate(["./purchase-graph"]);
  }
}
