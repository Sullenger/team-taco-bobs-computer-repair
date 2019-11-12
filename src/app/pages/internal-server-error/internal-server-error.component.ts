/*
============================================
; Title: WEB	450	Bob’s	Computer	Repair	Shop
; Author: Ethan Townsend, Lea Trueworthy, Natasha Whitmer, and Jason Sullenger
; Date: 17 October 2019
; Description: End-to-end billing system for Bob's Computer - MEAN stack
;===========================================
*/

import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-internal-server-error",
  templateUrl: "./internal-server-error.component.html",
  styleUrls: ["./internal-server-error.component.css"]
})
export class InternalServerErrorComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  navHome() {
    console.log("Home");
    //modified route to take to home
    this.router.navigate(["./home"]);
  }
}
