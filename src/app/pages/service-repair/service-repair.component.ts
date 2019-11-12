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
import { MatDialog, MatDialogConfig } from "@angular/material";
import { InvoiceSummaryComponent } from "../invoice-summary/invoice-summary.component";
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: "app-service-repair",
  templateUrl: "./service-repair.component.html",
  styleUrls: ["./service-repair.component.css"]
})
export class ServiceRepairComponent implements OnInit {
  invoice: any = {
    services: {},
    cart: [],
    total: [],
    servicesTotal: "",
    cartTotal: "",
    workHours: 0,
    parts: 0,
    addHour: 0,
    addPart: 0,
    addedHours: false,
    addedParts: false,
    date: "",
    user: ""
  };
  purchaseHistory: any;

  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private cookie: CookieService
  ) {}

  ngOnInit() {
    this.http.get("/purchases/api/all-services").subscribe(res => {
      if (res) {
        this.invoice.services = res;
        console.log(this.invoice.services);
      } else {
        console.log("no services found");
      }
    });
    this.invoice.user = this.cookie.get("user");
    this.http.get("/purchase-history/api/records").subscribe(res => {
      if (res) {
        this.purchaseHistory = res;
        console.log(this.purchaseHistory);
      } else {
        console.log("no purchase history found");
      }
    });
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    const invoiceModal = this.dialog.open(InvoiceSummaryComponent, {
      width: "60%",
      height: "90%",
      disableClose: true,
      panelClass: 'custom-dialog-container'
    });

    invoiceModal.componentInstance.invoice = this.invoice;
    invoiceModal.componentInstance.purchaseHistory = this.purchaseHistory;
  }

  slideToggle(event, service, service_price) {
    if (event.checked == true) {
      console.log(event.checked);
      this.addToCart(service);
      return;
    }

    for (let i = 0; i < this.invoice.cart.length; i++) {
      if (this.invoice.cart[i]["service_price"] == service_price) {
        this.invoice.cart.splice(i, 1);
        this.invoice.total.splice(i, 1);
        this.calcTotal();
        console.log(this.invoice.cart);
        console.log(this.invoice.total);
      }
    }
  }

  addHours() {
    this.invoice.addHour = this.invoice.workHours * 50;
    Number(this.invoice.addHour);
    this.invoice.total.push(this.invoice.addHour);
    console.log(this.invoice.total);
    this.calcTotal();
    this.invoice.addedHours = true;
  }

  addParts() {
    this.invoice.addPart = this.invoice.parts;
    Number(this.invoice.addPart);
    this.invoice.total.push(this.invoice.addPart);
    console.log(this.invoice.total);
    this.calcTotal();
    this.invoice.addedParts = true;
  }

  removeHours() {
    for (let i = 0; i < this.invoice.total.length; i++) {
      if (this.invoice.total[i] === this.invoice.addHour) {
        this.invoice.total.splice(i, 1);
      }
    }
    this.calcTotal();
    this.invoice.addHour = 0;
    this.invoice.addedHours = false;
  }

  removeParts() {
    for (let i = 0; i < this.invoice.total.length; i++) {
      if (this.invoice.total[i] === this.invoice.addPart) {
        this.invoice.total.splice(i, 1);
      }
    }
    this.calcTotal();
    this.invoice.addPart = 0;
    this.invoice.addedParts = false;
  }

  addToCart(service) {
    Number(service);
    this.invoice.cart.push(service);
    this.invoice.total.push(service.service_price);
    console.log(this.invoice.cart)
    console.log(this.invoice.total)
    this.calcTotal();
  }

  calcTotal() {
    this.invoice.cartTotal = this.invoice.total.reduce(
      (x, y) => x + y,
      0
    );
  }

  orderModal() {
    this.invoice.date = new Date();
    console.log(this.invoice);
    this.openDialog();
  }
}
