import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(private auth:AuthService) { }

  ngOnInit() {
    this.auth.check_django_login_status().subscribe(
      (response) => {
        console.log(response);
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
