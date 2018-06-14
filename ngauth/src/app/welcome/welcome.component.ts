import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  username: String;
  email: String;
  django_confirmation: Boolean = false;

  constructor(private auth:AuthService) { }

  ngOnInit() {
    let userinfo : any = this.auth.getUserInfo();
    this.username = userinfo.username;
    this.email = userinfo.email;

    this.auth.checkDjangoLoginStatus().subscribe(
      (response) => {
        console.log(response);
        this.django_confirmation = true;
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
