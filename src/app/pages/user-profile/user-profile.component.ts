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
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.css"]
})
export class UserProfileComponent implements OnInit {
  constructor(private http: HttpClient, private cookie: CookieService) {}

  userId: any;
  userData: any = {
    name_first: '',
    name_last: '',
    email: '',
    phone_number: '',
    address: '',
    date_created: ''
  };
  userInvoices: any;
  isResponse: boolean = false;

  ngOnInit() {
    this.userId = this.cookie.get("user");
    console.log(this.userId);

    this.http.get("/api/users/" + this.userId).subscribe(res => {
      if (res) {
        console.log(res);
        this.userData = res;
      } else {
        console.log("rip");
        return;
      }
    });

    this.http.get('/purchases/api/user-invoices/' + this.userId).subscribe(res => {
      if(res) {
        console.log(res);
        this.userInvoices = res;

        for(let i = 0; i < this.userInvoices.length; i++){
          if(this.userInvoices.length > 0){
            this.isResponse = true;
            console.log(this.isResponse)
          } else {
            this.isResponse = false;
            console.log(this.isResponse)
          }
        }
      } else {
        console.log('no users.');
        return;
      }
    })
  }
}
