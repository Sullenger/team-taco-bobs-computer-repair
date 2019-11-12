/*
============================================
; Title: WEB	450	Bob’s	Computer	Repair	Shop
; Author: Ethan Townsend, Lea Trueworthy, Natasha Whitmer, and Jason Sullenger
; Date: 17 October 2019
; Description: End-to-end billing system for Bob's Computer - MEAN stack
;===========================================
*/

import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { CookieService } from "ngx-cookie-service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  error: string;
  role: any;

  loginForm = this.fb.group({
    username: ["", Validators.required],
    password: ["", [Validators.required, Validators.minLength(8)]]
  });

  // loginForm = new FormGroup({
  //   username: new FormControl(''),
  //   password: new FormControl('')
  // });

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private cookie: CookieService,
    private router: Router
  ) {}

  ngOnInit() {}

  onSubmit(submit) {
    console.log(submit);

    this.http.post<any>("/auth/api/login", submit).subscribe(res => {
      if (res) {
        this.cookie.set("isAuthenticated", "true", 2);
        this.cookie.set("user", res.userId, 2);
        this.router.navigate(["/home"]);
      } else {
        this.error = "Invalid login credentials";
      }
    });
  }

  navRecovery() {
    this.router.navigate(["/session/forgot-password"]);
  }
  navRegister() {
    this.router.navigate(["/session/user-registration"]);
  }
}
