/*
============================================
; Title: WEB	450	Bob’s	Computer	Repair	Shop
; Author: Ethan Townsend, Lea Trueworthy, Natasha Whitmer, and Jason Sullenger
; Date: 17 October 2019
; Description: End-to-end billing system for Bob's Computer - MEAN stack
;===========================================
*/

import { Injectable } from "@angular/core";
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { nextTick } from "q";

@Injectable({
  providedIn: "root"
})
export class RoleGuardService implements CanActivate {
  constructor(
    private http: HttpClient,
    private router: Router,
    private cookie: CookieService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.findUserRole().pipe(
      map(res => {
        let role = JSON.stringify(res);
        let userRole = role.split(/[{};:"",]+/, 20);
        let isAdmin = "";

        loop();

        function loop() {
          for (let i = 0; i < userRole.length; i++) {
            if (userRole[i] === "admin") {
              isAdmin = userRole[i];
            }
          }
        }

        if (isAdmin === "admin") {
          return true;
        } else {
          alert("You're not authorized to access that page.")
          this.router.navigate(["/home"]);
          return false;
        }
      })
    );
  }

  findUserRole() {
    return this.http.get("/auth/api/roles/" + this.cookie.get("user"));
  }
}
