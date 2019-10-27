/*
============================================
; Title: WEB	450	Bob’s	Computer	Repair	Shop
; Author: Ethan Townsend, Lea Trueworthy, Natasha Whitmer, and Jason Sullenger
; Date: 17 October 2019
; Description: End-to-end billing system for Bob's Computer - MEAN stack
;===========================================
*/

import { Component, OnInit } from '@angular/core';
// Added Formbuilder for field parameters
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  }); 

  // Added fb FormBuilder
  constructor(private http: HttpClient, private cookie: CookieService, private router: Router, private fb: FormBuilder) { }
  
  //Added validator for username.. Need password as well
  ngOnInit() {
    this.loginForm = this.fb.group({
      username: [null, Validators.compose([Validators.required, Validators.pattern("^[0-9]*$")])]
    });
  }

  onSubmit(submit){

    console.log(submit)

    this.http.post<any>('/auth/api/login', submit).subscribe( res => {
      if(res) {
        console.log(res)
        this.cookie.set("isAuthenticated", "true", 10);
        this.cookie.set('user', res.userId)
        //Changed router to /home instead of /
        this.router.navigate(['/home']);
      } else {
        console.log('error')
      }
    })
  }

}