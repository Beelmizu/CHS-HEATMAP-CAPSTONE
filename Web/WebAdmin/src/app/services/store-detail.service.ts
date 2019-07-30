import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '../models/store.model';

@Injectable({
  providedIn: 'root'
})
export class StoreDetailService {

  private storeUrl = 'http://localhost:8080/api/store/';
  private headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  };
  constructor(private http: HttpClient) { }

  getStoreByID(storeID: number): Observable<Store> {
    return this.http.get<Store>(this.storeUrl + 'getDetail/' + storeID);
  }

  inactiveStoreByID(store: Store): Observable<any> {
    return this.http.post<any>(this.storeUrl + 'inactive/', store);
  }

  activeStoreByID(store: Store): Observable<any> {
    return this.http.post<any>(this.storeUrl + 'active/', store);
  }

  updateStoreByID(store: Store): Observable<any> {
    return this.http.post<any>(this.storeUrl + 'update/', store);
  }

 addNewStore(store: Store): Observable<any> {
    return this.http.post<any>(this.storeUrl + 'create/',  store);
  }
}
