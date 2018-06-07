import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { Headers } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  userinfo: any;

  API_URL = 'http://localhost:8000';

  constructor(private http:HttpClient) { }

  login(user) {
    // user is expected to be json with username and password keys
    return this.http.post(`${this.API_URL}/rest-auth/login/`, user);
  }

  logout() {
    this.authToken = null;
    this.userinfo = null;
    localStorage.clear();
  }

  loadToken() {
    let token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  storeUserData(token, userinfo) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('userinfo', JSON.stringify(userinfo));
    this.authToken = token;
    this.userinfo = userinfo;
  }
  
  getUserInfo() {
    let userinfo = localStorage.getItem('userinfo');
    userinfo = JSON.parse(userinfo);
    return userinfo;
  }

  loggedIn() {
    this.loadToken();
    if (this.authToken != null) {
      return true;
    } else {
      return false;
    }
  }

  checkDjangoLoginStatus() {
    this.loadToken();
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `JWT ${this.authToken}`
    });
    //headers.append('Authorization', `JWT ${this.authToken}`);
    //console.log(headers);
    return this.http.get(`${this.API_URL}/logged_in_check/`, {headers: headers})
  }
}
