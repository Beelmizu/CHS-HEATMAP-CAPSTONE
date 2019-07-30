import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '../models/store.model';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private storeUrl = 'http://localhost:8080/api/store/';
  private headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  };

  constructor(private http: HttpClient) {
  }

  getAllStore(): Observable<Store[]> {
    return this.http.get<Store[]>(this.storeUrl + 'getAll');
  }

  getAllStoreInCompany(companyID: number): Observable<Store[]> {
    return this.http.get<Store[]>(this.storeUrl + 'getStoreInCompany/' + companyID);
  }

  getAllStoreByAccount(accountID: number): Observable<Store[]> {
    return this.http.get<Store[]>(this.storeUrl + 'getStoreByAccount/' + accountID);
  }

  getAllStoreByAccountWithoutStatus(accountID: number): Observable<Store[]> {
    return this.http.get<Store[]>(this.storeUrl + 'getStoreByAccountWithoutStatus/' + accountID);
  }

  getStoreByValue(searchValue: String): Observable<Store[]> {
    return this.http.get<Store[]>(this.storeUrl + 'search/' + searchValue);
  }
}
