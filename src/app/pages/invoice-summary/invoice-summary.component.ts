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
    console.log(this.invoice)
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
        services_ordered: this.invoice.cart,
        order_snapshot: this.invoice,
        total: this.invoice.cartTotal,
        hours: this.invoice.addHour,
        parts: this.invoice.addPart
      })
      .subscribe(
        res => {},
        err => {
          console.log(err);
          alert("Error confirming order");
          this.dialogRef.close();
        },
        () => {
          alert("Thank you for confirming you order!");

          this.http
            .put("/purchase-history/api/records/5dc874cbcc0d5547e0e8a694", {
              items: this.purchaseHistory[0].items
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
        item.passwordReset++;
      }
      if (this.invoice.cart[i].service === "Spyware Removal") {
        item.spywareRemoval++;
      }
      if (this.invoice.cart[i].service === "RAM Upgrade") {
        item.ramUpgrade++;
      }
      if (this.invoice.cart[i].service === "Software Installation") {
        item.softwareInstallation++;
      }
      if (this.invoice.cart[i].service === "Tune-Up") {
        item.tuneUp++;
      }
      if (this.invoice.cart[i].service === "Keyboard Cleaning") {
        item.keyboardCleaning++;
      }
      if (this.invoice.cart[i].service === "Disk Cleanup") {
        item.diskCleanup++;
      }
    }
  }
}
