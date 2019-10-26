import { Component, OnInit } from '@angular/core';
import { User } from '.../../server/models/user.js';


@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  displayedColumns: string[] = ['userName', 'firstName', 'lastName', 'phone_number', 'email', 'address', 'update', 'delete'];
  users: User[];

  constructor() { }

  ngOnInit() {
    this.getUser();
  }

  getUser(): void {

  }

}
