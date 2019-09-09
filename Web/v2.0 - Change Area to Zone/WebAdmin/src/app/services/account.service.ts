import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from '../models/account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private accountUrl = 'http://localhost:8080/api/account/';
  private headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  };

  constructor(private http: HttpClient) {
  }

  getAllAccount(): Observable<Account[]> {
    return this.http.get<Account[]>(this.accountUrl + 'getAll');
  }

  getAccountByValue(searchValue: String): Observable<Account[]> {
    return this.http.get<Account[]>(this.accountUrl + 'search/' + searchValue);
  }

  getAccountInCompanyByValue(searchValue: String, companyID: number): Observable<Account[]> {
    return this.http.get<Account[]>(this.accountUrl + 'searchInCompany/' + searchValue +  '/' + companyID);
  }

  getAccountInStoreByValue(searchValue: String, storeID: number): Observable<Account[]> {
    return this.http.get<Account[]>(this.accountUrl + 'searchInStore/' + searchValue + '/ ' + storeID);
  }

  getAccountByCompany(id: number): Observable<Account[]> {
    return this.http.get<Account[]>(this.accountUrl + 'getAccountByCompany/' + id);
  }

  getAccountByStore(id: number): Observable<Account[]> {
    return this.http.get<Account[]>(this.accountUrl + 'getAccountByStore/' + id);
  }

  getAllAccountByCompanyNotBelongToThisStore(comID: number, stoID: number): Observable<Account[]> {
    return this.http.get<Account[]>(this.accountUrl + 'getAllAccountByCompanyNotBelongToThisStore/' + comID + '/' + stoID);
  }
}
