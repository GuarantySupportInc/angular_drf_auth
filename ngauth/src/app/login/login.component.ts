import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;

  constructor() { }

  ngOnInit() {
  }

  onSubmit() { 
    console.log(this.username)
    console.log(this.password)
  }

}
