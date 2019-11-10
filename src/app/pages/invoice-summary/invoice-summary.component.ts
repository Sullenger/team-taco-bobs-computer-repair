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
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-invoice-summary",
  templateUrl: "./invoice-summary.component.html",
  styleUrls: ["./invoice-summary.component.css"]
})
export class InvoiceSummaryComponent implements OnInit {
  @Input() public invoice;
  @Input() public purchaseHistory;

  constructor(
    private dialogRef: MatDialogRef<ServiceRepairComponent>,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    console.log(this.purchaseHistory);
  }

  close() {
    this.dialogRef.close();
  }

  orderConfirmed() {
    this.purchaseHistoryIncrement();
    this.http
      .post("/purchases/api/invoice", {
        date: this.invoice.date,
        user_id: this.invoice.user,
        services_ordered: this.invoice.services,
        order_snapshot: this.invoice,
        total: this.invoice.cartTotal
      })
      .subscribe(
        res => {},
        err => {
          console.log(err);
          alert("Error confirming order");
          this.dialogRef.close();
        },
        () => {
          this.purchaseHistoryIncrement();
          alert("Thank you for confirming you order!");

          this.http
            .put("/purchase-history/api/records/5dc8647753899e07a80ee71d", {
              items: this.purchaseHistory
            })
            .subscribe(
              res => {},
              err => {
                console.log(err);
              },
              () => {
                console.log("Increment Successful");
              }
            );

          this.dialogRef.close();
          this.router.navigate(["/home"]);
        }
      );
  }

  purchaseHistoryIncrement() {
    let item = this.purchaseHistory[0].items[0];
    for (var i = 0; i < this.invoice.cart.length; i++) {
      if (this.invoice.cart[i].service === "Password Reset") {
        item.passwordReset += 1;
      }
      if (this.invoice.cart[i].service === "Spyware Removal") {
        item.spywareRemoval += 1;
      }
      if (this.invoice.cart[i].service === "RAM Upgrade") {
        item.ramUpgrade += 1;
      }
      if (this.invoice.cart[i].service === "Software Installation") {
        item.softwareInstallation += 1;
      }
      if (this.invoice.cart[i].service === "Tune-Up") {
        item.tuneUp += 1;
      }
      if (this.invoice.cart[i].service === "Keyboard Cleaning") {
        item.keyboardCleaning += 1;
      }
      if (this.invoice.cart[i].service === "Disk Cleanup") {
        item.diskCleanup += 1;
      }
    }
  }
}
