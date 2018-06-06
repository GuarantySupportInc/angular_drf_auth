import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Authentication with Django Rest Framework';

  constructor(private auth:AuthService, private router:Router) { }

  onLogoutClick() {
    this.auth.logout();
    this.router.navigate(['login']);
  }
}
