import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
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
    return this.http.post<any>(this.accountUrl + 'create/', account);
  }

  addAccountToStore(accountID: number, storeID: number): Observable<any> {
    let body = new HttpParams();
    body = body.set('accID', '' + accountID);
    body = body.set('stoID', '' + storeID);
    return this.http.post<any>(this.accountUrl + 'addAccountToStore/', body);
  }

  getIDAccountByUsername(username: string): Observable<number> {
    return this.http.get<number>(this.accountUrl + 'getIDByUsername/' + username);
  }

  deleteAccountInStore(accountID: number, storeID: number): Observable<any> {
    let body = new HttpParams();
    body = body.set('accID', '' + accountID);
    body = body.set('stoID', '' + storeID);
    return this.http.post<any>(this.accountUrl + 'deleteAccountInStore/', body);
  }

  changePassword(accountID: String, oldPass: String, newPass: String, updatedBy: String): Observable<any> {
    let body = new HttpParams();
    body = body.set('accountID', '' + accountID);
    body = body.set('oldPass', '' + oldPass);
    body = body.set('newPass', '' + newPass);
    body = body.set('updatedBy', '' + updatedBy);
    return this.http.post<any>(this.accountUrl + 'changePassword/', body);
  }

}
