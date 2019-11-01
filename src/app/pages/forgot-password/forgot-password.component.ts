/*
============================================
; Title: WEB	450	Bob’s	Computer	Repair	Shop
; Author: Ethan Townsend, Lea Trueworthy, Natasha Whitmer, and Jason Sullenger
; Date: 17 October 2019
; Description: End-to-end billing system for Bob's Computer - MEAN stack
;===========================================
*/

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  hasSubmitted: boolean = false;
  securityQuestions: any = { questions: ''};
  user_answer: string = '';
  user_answer1: string = '';
  user_answer2: string = '';
  username: any;
  hasAnswered: boolean = false;
  errorMessage: boolean = false;
  displayError: string = '*One or more of your answers were incorrect.'
  userError: boolean = false;
  noPasswordMatch: boolean = false;
  updatePassword: string = '';
  confirmNewPassword: string = '';

  forgotPassword = this.fb.group({
    username: ['', Validators.required ]
  })

  resetPassword = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(7), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
      confirmPassword: ['', [Validators.required, Validators.minLength(7), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]]
  });

  constructor(private router: Router,private http: HttpClient, private fb: FormBuilder) { }

  ngOnInit() {
  }

  onSubmit(val) {

    this.username = val;
    
    console.log(val.username)

    this.http.post('/recovery/api/questions', val).subscribe( res => {
      this.securityQuestions = res;
      console.log(this.securityQuestions.result)
      


      if(this.securityQuestions.result.username == val.username){
        this.hasSubmitted = true;
      }
    })
  }

  checkAnswers(){
    // let answer1 = this.user_answer;
    // let answer2 = this.user_answer1;
    // let answer3 = this.user_answer2
    let answered = false
    let correctAnswer = 0;
    let error = false;

    let answers = this.securityQuestions.result.security_questions
    let newAnswers = JSON.stringify(answers)
    let newData = newAnswers.split(/[{};:"",]+/, 75)

    for(let i = 0; i < newData.length; i++) {
      
      if(newData[i] === this.user_answer){
        correctAnswer++
      } else if(newData[i] === this.user_answer1) {
        correctAnswer++
      } else if(newData[i] === this.user_answer2) {
        correctAnswer++
        console.log(correctAnswer)
      } else if(correctAnswer === 3) {
        answered = true;
      } else {
        error = true;
      }
    }

    this.hasAnswered = answered
    this.errorMessage = error;
    console.log(answered)
  }

  onReset(val) {

    console.log(this.updatePassword);
    console.log(this.confirmNewPassword)

    if( this.updatePassword !== this.confirmNewPassword) {
      this.noPasswordMatch = true
      console.log('fail')
      return
    } else{
      this.securityQuestions.result.password = this.updatePassword
      console.log(this.securityQuestions.result)
      this.http.put('/recovery/api/update/' + this.username.username, this.securityQuestions.result).subscribe( res => {
        console.log(res);
      })
    }
  
    alert("Password updated Successfully.")

    this.router.navigate(["/session/login"]);

    this.updatePassword = null;
    this.confirmNewPassword = null;
  }
}
