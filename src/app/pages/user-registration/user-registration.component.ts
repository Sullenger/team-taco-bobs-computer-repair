/*
============================================
; Title: WEB	450	Bob’s	Computer	Repair	Shop
; Author: Ethan Townsend, Lea Trueworthy, Natasha Whitmer, and Jason Sullenger
; Date: 17 October 2019
; Description: End-to-end billing system for Bob's Computer - MEAN stack
;===========================================
*/

import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
// import { User } from ".../../server/models/user.js";
// import { FormBuilder, Validators } from "@angular/forms";
// import { CookieService } from "ngx-cookie-service";
// import { Router } from "@angular/router";

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {
  newUser: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  registerUser(userData) {
    console.log(userData)
    // this.http.post('/api/users/registration', userData).subscribe( res => {
    // })
  }
}
