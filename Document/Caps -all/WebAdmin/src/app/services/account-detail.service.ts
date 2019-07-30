import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from '../models/account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountDetailService {

  private accountUrl = 'http://localhost:8080/api/account/';
  private headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  };

  constructor(private http: HttpClient) { }

  getAccountByID(accountID: number): Observable<Account> {
    return this.http.get<Account>(this.accountUrl + 'getDetail/' + accountID);
  }

  inactiveAccountByID(account: Account): Observable<any> {
    return this.http.post<any>(this.accountUrl + 'inactive/', account);
  }

  activeAccountByID(account: Account): Observable<any> {
    return this.http.post<any>(this.accountUrl + 'active/', account);
  }

  updateAccountByID(account: Account): Observable<any> {
    return this.http.post<any>(this.accountUrl + 'update/', account);
  }

 addNewAccount(account: Account): Observable<any> {
    return this.http.post<any>(this.accountUrl + 'create/',  account);
  }

  getIDAccountByUsername(username: string): Observable<number> {
    return this.http.get<number>(this.accountUrl + 'getIDByUsername/' + username);
  }
}
