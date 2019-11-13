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

@Component({
  selector: "app-role-configuration",
  templateUrl: "./role-configuration.component.html",
  styleUrls: ["./role-configuration.component.css"]
})
export class RoleConfigurationComponent implements OnInit {
  roles: any;
  errorMessage: string;
  roleId: string;
  editRoleId: any = "";
  newRole: boolean;
  newQuestionText: string;
  addingRole: string;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.http.get("/role-bank/api/role").subscribe(res => {
      if (res) {
        this.roles = res
        console.log(this.roles)
      } else {
        return (this.errorMessage = "AYYYYYUT, No roles found");
      }
    });
  }

  // Delete existing roles
  deleteRole(role) {
    this.roleId = role._id;
    console.log(this.roleId);
    this.http.delete("/role-bank/api/role/" + this.roleId).subscribe(res => {
      this.roles = res;
      document.location.reload(true);
    });
  }

  // Enables modifying existing roles
  edit(val) {
    this.editRoleId = val;
  }

  // Enables adding new role
  addNewRole() {
    this.newRole = true;
  }

  // Sends new question from input to DB
  addRole(roleInput) {
    console.log(roleInput);
    this.http
      .post("/role-bank/api/role", { role: roleInput })
      .subscribe(res => {
        this.roles = res;
        document.location.reload(true);
      });
  }

  // Updates existing questions
  update(role) {
    this.roleId = role._id;
    console.log(this.roleId);
    this.http
      .put("/role-bank/api/role/" + this.roleId, {
        role: role.role
      })
      .subscribe(res => {
        console.log(res);
        document.location.reload(true);
      });
  }
}
