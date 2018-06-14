import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;
  error_message: String;

  constructor(
    private auth:AuthService,
    private router:Router,
  ) { }

  ngOnInit() {
  }

  onSubmit() { 
    let user = {'username': this.username, 'password': this.password};

    this.auth.login(user).subscribe((response: any) => {
      //console.log(response);
      // Returns some JSON but what we really need
      // is the token to store, and maybe user details
      // to personalize later pages
      
      // response.user contains username, email, first and last name, etc
      this.auth.storeUserData(response.token, response.user);
      this.router.navigate(['welcome']);
    },
    (err) => {
      //console.log(err);
      // Returns as a whole bunch of 
      // JSON but what we want is non_field_errors 
      // in the error object (which is an array)
      // TODO - display this error on the form page
      //console.log(err.error.non_field_errors[0]);
      this.error_message = err.error.non_field_errors[0];
    });
  }

}
