import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse, HttpClientJsonpModule } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { LoginserviceService } from '../loginservice.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.css']
})
export class LoginScreenComponent implements OnInit {

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private loginService: LoginserviceService )  {}
  get userNAME() {
    return this.registrationFrom.get('userName');
  }

  get passwordd() {
    return this.registrationFrom.get('password');
  }

  message: string;
  registrationFrom = this.fb.group({
    userName: ['', [Validators.required, Validators.minLength(2)]],
    password: ['', [Validators.required, Validators.minLength(2)]]
  });
  result: any;
  showAlert: boolean;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  ngOnInit() {
  }


 logintoflix() {
//  this.loginService.loginCheck(this.userNAME.value, this.passwordd.value);
//   console.log('final result:' + this.result);
   return this.http.post<any>(`http://13.233.76.145/users/sign_in`, {

        'user': {
            'login': this.userNAME.value,
            'password': this.passwordd.value
          }

      }).subscribe(data => {
        this.router.navigate(['/user']);
        console.log(data);
    }, err => {
      if (err instanceof HttpErrorResponse) {
        switch ((<HttpErrorResponse>err).status) {
            case 400:
                return console.log(400);
            case 401:
            this.showAlert = true;
            console.log(this.result = err.error.error);

            return console.log();
        }
    } else {
        return Observable.throw(err);
    }
     console.log("err:"+err);
    }
    );

  }
}
