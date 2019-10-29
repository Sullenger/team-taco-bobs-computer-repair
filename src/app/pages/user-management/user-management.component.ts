import { Component, OnInit } from '@angular/core';
import { User } from '.../../server/models/user.js';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  displayedColumns: string[] = ['userName', 'firstName', 'lastName', 'phone_number', 'email', 'address', 'update', 'delete'];
  users: any;
  errorMessage: string;

  tableData: any = [];
  ShowEditedTable: boolean = false;
  editUserId: any = '';

  // updateForm = this.fb.group({
  //   username: [''],
  //   firstName: [''],
  //   lastName: [''],
  //   phone: [''],
  //   email: [''],
  //   address: this.fb.group({
  //     street_address: [''],
  //     city: [''],
  //     state: [''],
  //     zip: ['']
  //   })
  // })

  constructor(private fb: FormBuilder, private http: HttpClient, private cookie: CookieService, private router: Router) { }

  ngOnInit() {
    this.http.get('/api/users/').subscribe(res => {
    if (res) {
      return this.users = res;
    } else {
      return this.errorMessage = "Welcome to the land of no users :D";
    }
  })
  }

  edit(val) {
    this.editUserId = val;
  }

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

}
