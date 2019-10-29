/*
============================================
; Title: WEB	450	Bob’s	Computer	Repair	Shop
; Author: Ethan Townsend, Lea Trueworthy, Natasha Whitmer, and Jason Sullenger
; Date: 17 October 2019
; Description: End-to-end billing system for Bob's Computer - MEAN stack
;===========================================
*/

import { Component, OnInit } from "@angular/core";
import { User } from ".../../server/models/user.js";
import { FormBuilder, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { CookieService } from "ngx-cookie-service";
import { Router } from "@angular/router";

@Component({
  selector: "app-user-management",
  templateUrl: "./user-management.component.html",
  styleUrls: ["./user-management.component.css"]
})
export class UserManagementComponent implements OnInit {
  displayedColumns: string[] = [
    "userName",
    "firstName",
    "lastName",
    "phone_number",
    "email",
    "address",
    "update",
    "delete"
  ];
  users: any;
  errorMessage: string;
<<<<<<< HEAD

=======
>>>>>>> 0426d053275d1b0fef10d89f4f543fc039f286b9
  tableData: any = [];
  ShowEditedTable: boolean = false;
  editUserId: any = '';

  constructor(private fb: FormBuilder, private http: HttpClient, private cookie: CookieService, private router: Router) { }

  ngOnInit() {
    this.http.get("/api/users/").subscribe(res => {
      if (res) {
        return (this.users = res);
      } else {
        return (this.errorMessage = "Welcome to the land of no users :D");
      }
    });
  }

  edit(val) {
    this.editUserId = val;
  }
<<<<<<< HEAD

  // loadData(){
  //   this.updateForm.setValue({
  //     username: this.users.username,
  //     firstName: this.users.name_first,
  //     lastName: this.users.name_last,
  //     email: this.users.email,
  //     phone: this.users.phone,
  //     // address: {
  //     //   street_address: this.users.address.street_address,
  //     //   city: this.users.address.city,
  //     //   state: this.users.address.state,
  //     //   zip: this.users.address.zip
  //     // }
  //   })
  // }

=======
>>>>>>> 0426d053275d1b0fef10d89f4f543fc039f286b9
}
