import { Component } from '@angular/core';
// import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  // constructor(private fb: FormBuilder, private http: HttpClient)  {}

  // registrationFrom = this.fb.group({
  //   userName: ['', [Validators.required, Validators.minLength(2)]],
  //   password: ['', [Validators.required, Validators.minLength(2)]],
  //   confirmPassword: [''],
  //   address: this.fb.group({
  //     city: [''],
  //     state: [''],
  //     pin: ['']
  //   })
  // });

  //  registrationFrom = new FormGroup({
  //   userName: new FormControl(''),
  //   password: new FormControl(''),
  //   confirmPassword: new FormControl(''),
  //   address: new FormGroup({
  //     city: new FormControl(''),
  //     state: new FormControl(''),
  //     pin: new FormControl('')
  //   })
  // });
  login: string;
  password: string;
  user: string;


  // loadApiData() {

  //   this.registrationFrom.patchValue({
  //     userName: 'Satish',
  //     password: 'Satish',
  //     confirmPassword: 'Satish'
  //   });
  // }

}
