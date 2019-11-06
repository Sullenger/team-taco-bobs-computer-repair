/*
============================================
; Title: WEB	450	Bob’s	Computer	Repair	Shop
; Author: Ethan Townsend, Lea Trueworthy, Natasha Whitmer, and Jason Sullenger
; Date: 17 October 2019
; Description: End-to-end billing system for Bob's Computer - MEAN stack
;===========================================
*/

import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { AppRoutes } from "./app.routing";

import { AppComponent } from "./app.component";
import { BaseLayoutComponent } from "./shared";
import { HomeComponent } from "./pages/home/home.component";
import { SessionLayoutComponent } from "./shared";
import { LoginComponent } from "./pages/login/login.component";
import { NotFoundComponent } from "./pages/not-found/not-found.component";
import { UserManagementComponent } from "./pages/user-management/user-management.component";
import { SecurityQuestionsComponent } from "./pages/security-questions/security-questions.component";
import { ErrorInterceptorComponent } from './pages/error-interceptor/error-interceptor.component';
import { AuthGuardService } from "./../auth.guard";

import { CookieService } from "ngx-cookie-service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatTableModule, MatDialog, MatDialogModule } from "@angular/material";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule, matMenuAnimations } from "@angular/material/menu";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import {MatSelectModule} from '@angular/material/select';
import { HeaderComponent } from "./shared/header/header.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { UserRegistrationComponent } from './pages/user-registration/user-registration.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { InternalServerErrorComponent } from './pages/internal-server-error/internal-server-error.component';
import { ErrorInterceptor } from './error-interceptor';
import { PurchaseGraphComponent } from './pages/purchase-graph/purchase-graph.component';

@NgModule({
  declarations: [
    AppComponent,
    BaseLayoutComponent,
    HomeComponent,
    SessionLayoutComponent,
    LoginComponent,
    NotFoundComponent,
    UserManagementComponent,
    SecurityQuestionsComponent,
    HeaderComponent,
    ForgotPasswordComponent,
    UserRegistrationComponent,
    AboutUsComponent,
    ContactUsComponent,
    InternalServerErrorComponent,
    ErrorInterceptorComponent,
    PurchaseGraphComponent
  ],
  imports: [
    BrowserModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,
    MatDialogModule,
    RouterModule.forRoot(AppRoutes, { useHash: true, enableTracing: false })
  ],
  providers: [CookieService, AuthGuardService,
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorInterceptorComponent]
})
export class AppModule {}
