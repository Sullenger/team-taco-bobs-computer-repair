

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from "ngx-cookie-service";


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private http: HttpClient, private cookie: CookieService) { 

  }

  userId: any;
  userData: any;
  userInvoice: any;

  ngOnInit() {

    this.userId = this.cookie.get('user')
    console.log(this.userId)

    this.http.get('/api/users/' + this.userId).subscribe( res => {
      if(res){
        console.log(res)
        this.userData = res;
      } else {
        console.log('rip')
        return
      }
    })

  }

}
