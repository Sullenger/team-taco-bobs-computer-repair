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
import { CookieService } from "ngx-cookie-service";

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
  addingQuestion: string;

  constructor(
    private cookie: CookieService,
    private http: HttpClient,
    private router: Router // private fb: FormBuilder, // private cookie: CookieService,
  ) {}

  ngOnInit() {
    this.http.get("/questions/api/question").subscribe(res => {
      if (res) {
        console.log(this.questions);
        return (this.questions = res);
      } else {
        return (this.errorMessage = "No questions found");
      }
    });
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
        console.log(res)
        document.location.reload(true);
      });
  }
}
