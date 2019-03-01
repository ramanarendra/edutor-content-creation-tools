import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User } from './loginmodel';
// import { map } from 'rxjs/operators';
// import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {

  constructor(private http: HttpClient, private router: Router) { }

  userAttemptData() {
    return this.http.get(`http://13.233.76.145/assessment/get_quiz_attempt_data?user_id=29&guid=3d13f942-f6f6-4605-a3a5-76bf2e198e36`)
    .pipe(map(result => result));
  }

  jsonPlace(): Observable<User> {
    return this.http.get<User>(`https://jsonplaceholder.typicode.com/posts/1/comments`).pipe(map(result => result));
  }
fakeApi() {
  return this.http.get(`http://d.microbuilder.io:8080/test/temp`)
    .pipe(
      map(result => result)
    );
}
  dailyForecast() {
    return this.http.get(`http://samples.openweathermap.org/data/2.5/history/city?q=Warren,OH&appid=b6907d289e10d714a6e88b30761fae22`)
    .pipe(
      map(result => result)
    );
  }

  loginCheck(username: string, password: string) {

    return this.http.post<any>(`http://13.233.76.145/users/sign_in`, {

      'user': {
          'login': username,
          'password': password
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
              return console.log(err.error);
      }
  } else {
      return Observable.throw(err);
  }
   console.log(err);
  }
  );
  }
}
