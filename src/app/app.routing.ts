/*
============================================
; Title: WEB	450	Bob’s	Computer	Repair	Shop
; Author: Ethan Townsend, Lea Trueworthy, Natasha Whitmer, and Jason Sullenger
; Date: 17 October 2019
; Description: End-to-end billing system for Bob's Computer - MEAN stack
;===========================================
*/

import { Routes } from "@angular/router";
import { BaseLayoutComponent, SessionLayoutComponent } from "./shared";
import { LoginComponent } from "./pages/login/login.component";
import { HomeComponent } from "./pages/home/home.component";
import { NotFoundComponent } from "./pages/not-found/not-found.component";
import { AuthGuardService } from "../auth.guard";
import { SecurityQuestionsComponent } from "./pages/security-questions/security-questions.component";
import { UserManagementComponent } from "./pages/user-management/user-management.component";
import { Session } from "protractor";
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { UserRegistrationComponent } from './pages/user-registration/user-registration.component';

export const AppRoutes: Routes = [
  //removed empty paths
  // modified line 25 to be empty path
  {
    path: "",
    component: BaseLayoutComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        // changed path to home
        path: "home",
        component: HomeComponent
      },
      {
        // changed path to not include id
        path: "security-questions",
        component: SecurityQuestionsComponent
      },
      {
        // changed path to not include id
        path: "user-management",
        component: UserManagementComponent
      }
    ]
  },
  {
    path: "session",
    component: SessionLayoutComponent,
    children: [
      {
        path: "login",
        component: LoginComponent
      },
      {
        path: "404",
        component: NotFoundComponent
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent
      },
      {
        path: 'user-registration',
        component: UserRegistrationComponent
      }
    ]
  },
  {
    path: "**",
    redirectTo: "session/404"
  }
];
