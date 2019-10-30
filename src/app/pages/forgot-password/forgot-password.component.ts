/*
============================================
; Title: WEB	450	Bob’s	Computer	Repair	Shop
; Author: Ethan Townsend, Lea Trueworthy, Natasha Whitmer, and Jason Sullenger
; Date: 17 October 2019
; Description: End-to-end billing system for Bob's Computer - MEAN stack
;===========================================
*/

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPassword = this.fb.group({
    username: ['', Validators.required ]
  })

  constructor(private http: HttpClient, private fb: FormBuilder) { }

  ngOnInit() {
  }

  onSubmit(val) {

    this.http.post('/recovery/api/questions', val).subscribe( res => {
      console.log(res);
    })
  }

}
