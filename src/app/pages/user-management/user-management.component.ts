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
  role: any;
  isAdmin: boolean = false;
  hideUsers: boolean = false;

  tableData: any;
  ShowEditedTable: boolean = false;
  editUserId: any = '';
  isEdit: boolean = false;

  constructor(private fb: FormBuilder, private http: HttpClient, private cookie: CookieService, private router: Router) { }

  ngOnInit() {
    this.http.get("/api/users/").subscribe(res => {
      if (res) {
        console.log(res)
        return (this.users = res);
      } else {
        return (this.errorMessage = "Welcome to the land of no users :D");
      }
    });

    this.userAdmin()
  }

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

    onUpdate(val1) {
    console.log(val1)
    this.http.put('/api/users/' + this.editUserId, val1 ).subscribe( res => {
      this.tableData = res;
      document.location.reload(true)
     })
  }

  onDelete(val1, val2) {
    console.log(val1)
    console.log(this.editUserId)

    this.http.delete('/api/users/' + val2, val1 ).subscribe( res => {
      this.tableData = res;
      document.location.reload(true)
     })
  }

  edit(val) {
    console.log(val)
    this.editUserId = val;
    this.isEdit = true
  }

}
