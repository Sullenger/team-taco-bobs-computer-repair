/*
============================================
; Title: WEB	450	Bob’s	Computer	Repair	Shop
; Author: Ethan Townsend, Lea Trueworthy, Natasha Whitmer, and Jason Sullenger
; Date: 17 October 2019
; Description: End-to-end billing system for Bob's Computer - MEAN stack
;===========================================
*/

import { Component, OnInit, Input } from "@angular/core";
import { MatDialogRef } from "@angular/material";
import { ServiceRepairComponent } from "../service-repair/service-repair.component";
import { Router } from "@angular/router";

@Component({
  selector: "app-invoice-summary",
  templateUrl: "./invoice-summary.component.html",
  styleUrls: ["./invoice-summary.component.css"]
})
export class InvoiceSummaryComponent implements OnInit {
  // change later
  @Input() public NameOfServiceOrder;

  constructor(
    private dialogRef: MatDialogRef<ServiceRepairComponent>,
    private router: Router
  ) {}

  ngOnInit() {
    // change later
    console.log(this.NameOfServiceOrder);
  }

  close() {
    this.dialogRef.close();
    this.router.navigate(["/home"]);
  }
}
