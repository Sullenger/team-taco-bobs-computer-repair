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
// import { FormBuilder, Validators } from '@angular/forms';
// import { CookieService } from 'ngx-cookie-service';
// import { Router } from '@angular/router';

@Component({
  selector: "app-security-questions",
  templateUrl: "./security-questions.component.html",
  styleUrls: ["./security-questions.component.css"]
})
export class SecurityQuestionsComponent implements OnInit {
  questions: any;
  errorMessage: string;
  questionId: string;

  constructor(
    private http: HttpClient // private fb: FormBuilder,
   // private cookie: CookieService,
  // private router: Router
  ) {}

  ngOnInit() {
    this.http.get("/questions/api/question").subscribe(res => {
      if (res) {
        return (this.questions = res);
        console.log(this.questions);
      } else {
        return (this.errorMessage = "No questions found");
      }
    });
  }

  deleteQuestion(question) {
    this.questionId = question._id
    console.log(this.questionId)
    this.http.delete("/questions/api/question/" + this.questionId).subscribe(res => {
      this.questions = res
    })
  }
}
