/*
============================================
; Title: WEB	450	Bob’s	Computer	Repair	Shop
; Author: Ethan Townsend, Lea Trueworthy, Natasha Whitmer, and Jason Sullenger
; Date: 17 October 2019
; Description: End-to-end billing system for Bob's Computer - MEAN stack
;===========================================
*/

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-service-repair',
  templateUrl: './service-repair.component.html',
  styleUrls: ['./service-repair.component.css']
})
export class ServiceRepairComponent implements OnInit {

  services: any = {};
  cart: any =[]
  total: any = [];
  servicesTotal: any = ''; 
  cartTotal: any = '';
  workHours: number = 0;
  parts: number = 0;
  addHour: number = 0;
  addPart: number = 0;
  addedHours: boolean = false;
  addedParts: boolean = false;

  constructor(private http: HttpClient) { 
  }

  ngOnInit() {

    this.http.get('/purchases/api/all-services').subscribe( res => {
      if(res){
        this.services = res;
        console.log(this.services)
      } else {
        console.log('no services found')
      }
    })
  }

  slideToggle(event, service, service_price) {

    if(event.checked == true){
      console.log(event.checked)
      this.addToCart(service)
      return
    } 

    for (let i = 0; i < this.cart.length; i++) {
      if (this.cart[i]['service_price'] == service_price) {
        this.cart.splice(i,1);
        this.total.splice(i,1);
        this.calcTotal();
        console.log(this.cart)
        console.log(this.total)
      } else{
        console.log('rip.. ayyyut')
      }
    }
  }


  addHours(){
    this.addHour = this.workHours * 50;
    this.total.push(this.addHour)
    console.log(this.total)
    this.calcTotal()
    this.addedHours = true;
  }

  addParts(){
    this.addPart = this.parts ;
    this.total.push(this.addPart)
    console.log(this.total)
    this.calcTotal()
    this.addedParts = true;
  }

  removeHours(){
    for (let i = 0; i < this.total.length; i++) {
      if (this.total[i] === this.addHour) {
        this.total.splice(i,1);
      }
    }
    this.calcTotal()
    this.addHour = 0;
    this.addedHours = false;
  }

  removeParts(){
    for (let i = 0; i < this.total.length; i++) {
      if (this.total[i] === this.addPart) {
        this.total.splice(i,1);
      }
    }
    this.calcTotal()
    this.addPart = 0;
    this.addedParts = false;
  }

  addToCart(service){
    this.cart.push(service)
    this.total.push(service.service_price)
    this.calcTotal()
  }

  calcTotal(){
    this.cartTotal = this.total.reduce((x, y) => x + parseInt(y), 0)
    console.log(this.cartTotal)
  }

}
