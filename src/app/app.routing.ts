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
import { AuthGuardService } from "./guards/auth.guard";
import { RoleGuardService } from "./guards/role.guard";
import { SecurityQuestionsComponent } from "./pages/security-questions/security-questions.component";
import { UserManagementComponent } from "./pages/user-management/user-management.component";
import { Session } from "protractor";
import { ForgotPasswordComponent } from "./pages/forgot-password/forgot-password.component";
import { UserRegistrationComponent } from "./pages/user-registration/user-registration.component";
import { AboutUsComponent } from "./pages/about-us/about-us.component";
import { ContactUsComponent } from "./pages/contact-us/contact-us.component";
import { InternalServerErrorComponent } from "./pages/internal-server-error/internal-server-error.component";
import { PurchaseGraphComponent } from "./pages/purchase-graph/purchase-graph.component";
import { ServiceRepairComponent } from "./pages/service-repair/service-repair.component";
import { InvoiceSummaryComponent } from "./pages/invoice-summary/invoice-summary.component";
import { RoleConfigurationComponent } from "./pages/role-configuration/role-configuration.component";
import { UserProfileComponent } from "./pages/user-profile/user-profile.component";

export const AppRoutes: Routes = [
  {
    path: "",
    component: BaseLayoutComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: "home",
        component: HomeComponent
      },
      {
        path: "security-questions",
        component: SecurityQuestionsComponent,
        canActivate: [RoleGuardService]
      },
      {
        path: "user-management",
        component: UserManagementComponent,
        canActivate: [RoleGuardService]
      },
      {
        path: "purchase-graph",
        component: PurchaseGraphComponent,
        canActivate: [RoleGuardService]
      },
      {
        path: "service-repair",
        component: ServiceRepairComponent
      },
      {
        path: "invoice-summary",
        component: InvoiceSummaryComponent
      },
      {
        path: "role-configuration",
        component: RoleConfigurationComponent,
        canActivate: [RoleGuardService]
      },
      {
        path: "user-profile",
        component: UserProfileComponent
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
        path: "500",
        component: InternalServerErrorComponent
      },
      {
        path: "forgot-password",
        component: ForgotPasswordComponent
      },
      {
        path: "user-registration",
        component: UserRegistrationComponent
      },
      {
        path: "about-us",
        component: AboutUsComponent
      },
      {
        path: "contact-us",
        component: ContactUsComponent
      }
    ]
  },
  {
    path: "**",
    redirectTo: "session/404"
  }
];
