import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { map } from 'rxjs/operators';
import { RequestOptions, Request, Headers } from '@angular/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  login(userLogin: User): Observable<any> {
    httpOptions.headers.append('Access-Control-Allow-Origin', '*');
    httpOptions.headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    httpOptions.headers.append('Access-Control-Allow-Headers', 'content-type');

    return this.http.post<any>(this.loginUrl + '/login', JSON.stringify(userLogin), { observe: 'response', headers: httpOptions.headers});

  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('accountID');
  }
}
