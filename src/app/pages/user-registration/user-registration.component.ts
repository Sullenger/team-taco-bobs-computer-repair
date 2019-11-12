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
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { User } from ".../../server/models/user.js";
import { MatAutocompleteTrigger } from '@angular/material';

@Component({
  selector: "app-user-registration",
  templateUrl: "./user-registration.component.html",
  styleUrls: ["./user-registration.component.css"]
})
export class UserRegistrationComponent implements OnInit {
  errorMessage: string;
  newUser: any;
  securityQuestions: any;
  form: FormGroup;
  resSuccess: any;
  securityQuestionError: string = 'Security questions cannot be the same.';

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private cookie: CookieService
  ) {}

  ngOnInit() {
    this.http.get("/questions/api/question").subscribe(res => {
      if (res) {
        this.securityQuestions = res;
      } else {
        this.errorMessage = "No security questions found";
      }
    });

    this.form = this.fb.group({
      username: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      password: [
        "",
        [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[A-Z]).{8,}$/)]
      ],
      name_first: ["", [Validators.required]],
      name_last: ["", [Validators.required]],
      phone_number: ["", [Validators.required]],
      street: ["", [Validators.required]],
      city: ["", [Validators.required]],
      state: ["", [Validators.required]],
      zip: ["", [Validators.required]],
      securityQuestionOne: ["", [Validators.required]],
      securityQuestionTwo: ["", [Validators.required]],
      securityQuestionThree: ["", [Validators.required]],
      securityAnswerOne: ["", [Validators.required]],
      securityAnswerTwo: ["", [Validators.required]],
      securityAnswerThree: ["", [Validators.required]]
    });
  }

  onSubmit(userData) {

    console.log(userData);
    let formAddress = {
      street_address: userData.street,
      city: userData.city,
      state: userData.state,
      zip: userData.zip
    };
    let formSecurityQuestion = {
      question_text: userData.securityQuestionOne,
      user_answer: userData.securityAnswerOne,
      question_text1: userData.securityQuestionTwo,
      user_answer1: userData.securityAnswerTwo,
      question_text2: userData.securityQuestionThree,
      user_answer2: userData.securityAnswerThree
    };

    if(formSecurityQuestion.question_text === formSecurityQuestion.question_text1) {
      alert(this.securityQuestionError)
      return
    } else if (formSecurityQuestion.question_text === formSecurityQuestion.question_text2) {

      alert(this.securityQuestionError)
      return
    } else if(formSecurityQuestion.question_text1 === formSecurityQuestion.question_text ){
      alert(this.securityQuestionError)
      return
    }  else if(formSecurityQuestion.question_text1 === formSecurityQuestion.question_text2 ){
      alert(this.securityQuestionError)
      return
    }  else if(formSecurityQuestion.question_text2 === formSecurityQuestion.question_text ){
      alert(this.securityQuestionError)
      return
    } else if(formSecurityQuestion.question_text2 === formSecurityQuestion.question_text1 ){
      alert(this.securityQuestionError)
      return
    } else {
      console.log('succeses')
    }

    let formRole = {
      role: "standard"
    };
    this.http
      .post("/api/users/registration", {
        username: userData.username,
        email: userData.email,
        password: userData.password,
        name_first: userData.name_first,
        name_last: userData.name_last,
        phone_number: userData.phone_number,
        roles: formRole,
        address: formAddress,
        security_questions: formSecurityQuestion,
        date_updated: new Date()
      })
      .subscribe(
        res => {
          console.log(res);
          this.resSuccess = res;
        },
        err => {
          console.log(err);
          // Route to 500
          // this.router.navigate(["/"]);
        },
        () => {
          this.cookie.set("isAuthenticated", "true", 10);
          this.cookie.set("user", this.resSuccess.result._id);
          this.cookie.set("role", "standard");
          this.router.navigate(["/home"]);
        }
      );
  }
}