/*
============================================
; Title: WEB	450	Bob’s	Computer	Repair	Shop
; Author: Ethan Townsend, Lea Trueworthy, Natasha Whitmer, and Jason Sullenger
; Date: 17 October 2019
; Description: End-to-end billing system for Bob's Computer - MEAN stack
;===========================================
*/

import {Routes} from '@angular/router';
import {BaseLayoutComponent, SessionLayoutComponent} from './shared';
import {LoginComponent} from './pages/login/login.component';
import {HomeComponent} from './pages/home/home.component';
import {NotFoundComponent} from './pages/not-found/not-found.component';

export const AppRoutes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      }
    ]
  },
  {
    path: 'session',
    component: SessionLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: '404',
        component: NotFoundComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'session/404'
  }
];
