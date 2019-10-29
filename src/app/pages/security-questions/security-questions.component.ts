import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { FormBuilder, Validators } from '@angular/forms';
// import { CookieService } from 'ngx-cookie-service';
// import { Router } from '@angular/router';

@Component({
  selector: 'app-security-questions',
  templateUrl: './security-questions.component.html',
  styleUrls: ['./security-questions.component.css']
})
export class SecurityQuestionsComponent implements OnInit {
  questions: any;
  errorMessage: string;

  constructor(
    private http: HttpClient,
    // private fb: FormBuilder,
    // private cookie: CookieService,
    // private router: Router
    ) { }

  ngOnInit() {
    this.http.get('/questions/api/question').subscribe(res => {
      if (res) {
        return this.questions = res;
        console.log(this.questions)
      } else {
        return this.errorMessage = "No questions found";
      }
    })
  }
}
