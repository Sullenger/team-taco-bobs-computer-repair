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
}
