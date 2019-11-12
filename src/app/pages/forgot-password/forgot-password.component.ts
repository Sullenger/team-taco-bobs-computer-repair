/*
============================================
; Title: WEB	450	Bob’s	Computer	Repair	Shop
; Author: Ethan Townsend, Lea Trueworthy, Natasha Whitmer, and Jason Sullenger
; Date: 17 October 2019
; Description: End-to-end billing system for Bob's Computer - MEAN stack
;===========================================
*/

import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, AbstractControl } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.css"]
})
export class ForgotPasswordComponent implements OnInit {
  hasSubmitted: boolean = false;
  securityQuestions: any;
  user_answer: string = "";
  user_answer1: string = "";
  user_answer2: string = "";
  username: any;
  hasAnswered: boolean = false;
  errorMessage: boolean = false;
  displayError: string = "*One or more of your answers were incorrect.";
  userError: boolean = false;
  noPasswordMatch: boolean = false;
  updatePassword: string = "";
  confirmNewPassword: string = "";

  secQuestions: any;
  secQuestionIds: any = [];
  secQuestionQuestions: any = []
  userQuestions: any = []

  question1:any = ''
  question2:any = ''
  question3:any = ''


  forgotPassword = this.fb.group({
    username: ["", Validators.required]
  });

  resetPassword = this.fb.group({
    password: [
      "",
      [
        Validators.required,
        Validators.minLength(7),
        Validators.pattern(
          "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}"
        )
      ]
    ],
    confirmPassword: [
      "",
      [
        Validators.required,
        Validators.minLength(7),
        Validators.pattern(
          "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}"
        )
      ]
    ]
  });

  constructor(
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.http.get("/questions/api/question").subscribe(res => {
      if (res) {
        this.secQuestions = res;
        console.log(this.secQuestions);
        return;
      } else {
        console.log("fail");
      }
    });
  }

  onSubmit(val) {
    this.username = val;

    this.http.post("/recovery/api/questions", val).subscribe(res => {
      this.securityQuestions = res;
      console.log(this.securityQuestions)
    
      if (this.securityQuestions.result.username == val.username) {
        console.log('success')
        this.hasSubmitted = true;
      }
    });

    setTimeout(()=> {this.extractIds()} ,300)
  }

 extractIds(){
    if(this.securityQuestions !== undefined){
      for (let userQuestion of this.securityQuestions.result.security_questions){
        for(let questionId of this.secQuestions){
          if(userQuestion.question_text === questionId._id){
            this.question1 = questionId.question
          } else if(userQuestion.question_text1 === questionId._id){
            this.question2 = questionId.question
          } else if (userQuestion.question_text2 === questionId._id){
            this.question3 = questionId.question
          } else {
            console.log('rip')
          }
        }
      }
    }

  }


  checkAnswers() {
    let answered = false;
    let correctAnswer = 0;
    let error = false;

    let answers = this.securityQuestions.result.security_questions;
    let newAnswers = JSON.stringify(answers);
    let newData = newAnswers.split(/[{};:"",]+/, 75);

    for (let i = 0; i < newData.length; i++) {
      if (newData[i] === this.user_answer) {
        correctAnswer++;
      } else if (newData[i] === this.user_answer1) {
        correctAnswer++;
      } else if (newData[i] === this.user_answer2) {
        correctAnswer++;
        console.log(correctAnswer);
      } else if (correctAnswer === 3) {
        answered = true;
      } else {
        error = true;
      }
    }
    this.hasAnswered = answered;
    this.errorMessage = error;
    console.log(answered);
  }

  onReset(val) {
    if (this.updatePassword !== this.confirmNewPassword) {
      this.noPasswordMatch = true;
      console.log("fail");
      return;
    } else {
      this.securityQuestions.result.password = this.updatePassword;
      console.log(this.securityQuestions.result);
      this.http
        .put(
          "/recovery/api/update/" + this.username.username,
          this.securityQuestions.result
        )
        .subscribe(res => {
          console.log(res);
          alert("Password updated Successfully.");
        });
    }

    this.router.navigate(["/session/login"]);

    this.updatePassword = null;
    this.confirmNewPassword = null;
  }
}
