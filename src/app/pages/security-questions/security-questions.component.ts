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
import { Router } from "@angular/router";
// import { FormBuilder, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: "app-security-questions",
  templateUrl: "./security-questions.component.html",
  styleUrls: ["./security-questions.component.css"]
})
export class SecurityQuestionsComponent implements OnInit {
  questions: any;
  errorMessage: string;
  questionId: string;
  editQuestionId: any = "";
  newQuestion: boolean;
  newQuestionText: string;
  role: any;
  isAdmin: boolean = false;
  hideUsers: boolean = false;

  constructor(
    private cookie: CookieService,
    private http: HttpClient,
    private router: Router // private fb: FormBuilder, // private cookie: CookieService,
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

    this.userAdmin()
  }

// restricts access to standard users
  userAdmin() {
    this.role = this.cookie.get('role')
    console.log(this.role);
    if(this.role == "admin") {
      this.isAdmin = true;
      this.hideUsers = false;
      console.log(this.isAdmin)
    }
    else {
      this.isAdmin = false;
      this.hideUsers = true;
    }
  }

  // Deletes existing question
  deleteQuestion(question) {
    this.questionId = question._id;
    console.log(this.questionId);
    this.http
      .delete("/questions/api/question/" + this.questionId)
      .subscribe(res => {
        this.questions = res;
        document.location.reload(true);
      });
  }

  // Enables modifying existing questions
  edit(val) {
    this.editQuestionId = val;
  }

  // Enables adding new question
  addNewQuestion() {
    this.newQuestion = true;
  }

  // Sends new question from input to DB
  addQuestion(questionInput) {
    console.log(questionInput);
    this.http
      .post("/questions/api/question/", { question: questionInput })
      .subscribe(res => {
        this.questions = res;
        document.location.reload(true);
      });
  }

  // Updates existing questions
  update(question) {
    this.questionId = question._id;
    console.log(this.questionId);
    this.http
      .put("/questions/api/question/" + this.questionId, {
        question: question.question
      })
      .subscribe(res => {
        this.questions = res;
        document.location.reload(true);
      });
  }
}
