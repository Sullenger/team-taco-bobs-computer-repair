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

@Component({
  selector: "app-purchase-graph",
  templateUrl: "./purchase-graph.component.html",
  styleUrls: ["./purchase-graph.component.css"]
})
export class PurchaseGraphComponent implements OnInit {
  errorMessage: string;
  servicesPurchased: any;
  data: any;
  serviceCount: string[] = [];

  // Resources
  // https://www.primefaces.org/primeng/#/chart
  // https://www.primefaces.org/primeng/#/chart/bar

  constructor(private http: HttpClient) {
    this.data = {
      labels: ['First Item', 'Second Item', 'Third Item', 'Fourth Item'],
      datasets: [
          {
              backgroundColor: 'white',
              borderColor: 'blue',
              data: this.servicesPurchased
          },
      ]
  }
  }

  ngOnInit() {
    this.http.get("/purchase-history/api/records").subscribe(res => {
      if (res) {
        this.servicesPurchased = res;
        console.log(this.servicesPurchased);
      } else {
        this.errorMessage = "Error collecting purchase data";
      }
    });
  }


}
