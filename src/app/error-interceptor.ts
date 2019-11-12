/*
============================================
; Title: WEB	450	Bob’s	Computer	Repair	Shop
; Author: Ethan Townsend, Lea Trueworthy, Natasha Whitmer, and Jason Sullenger
; Date: 17 October 2019
; Description: End-to-end billing system for Bob's Computer - MEAN stack
;===========================================
*/

import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse
} from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material";
import { Router } from "@angular/router";
import { ErrorInterceptorComponent } from "./pages/error-interceptor/error-interceptor.component";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private dialog: MatDialog, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if ([500].indexOf(error.status) !== -1) {
          this.router.navigate(["/sesson/500"]);
        }

        let errorMessage = "An unknown error has occured..";
        if (error.error.message) {
          errorMessage = error.error.message;
        }
        this.dialog.open(ErrorInterceptorComponent, {
          data: { message: errorMessage }
        });
        console.log(error);
        // alert(error.error.message)
        return throwError(error);
      })
    );
  }
}
