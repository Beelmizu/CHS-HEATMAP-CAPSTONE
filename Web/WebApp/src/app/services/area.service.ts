import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Area } from '../models/area.model';

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  private areaUrl = 'http://localhost:8080/api/area/';
  private headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  };

  constructor(private http: HttpClient) {
  }

  getAllArea(): Observable<Area[]> {
    return this.http.get<Area[]>(this.areaUrl + 'getAll');
  }

  getAllAreaOfAccount(accountID: number): Observable<Area[]> {
    return this.http.get<Area[]>(this.areaUrl + 'getAllAreaOfAccount/' + accountID);
  }

  getAllAreaInStore(storeID: number): Observable<Area[]> {
    return this.http.get<Area[]>(this.areaUrl + 'getActiveAreaByStoID/' + storeID);
  }

  getAreaByValue(searchValue: String): Observable<Area[]> {
    return this.http.get<Area[]>(this.areaUrl + 'search/' + searchValue);
  }

  getAreaByID(id: number): Observable<Area> {
    return this.http.get<Area>(this.areaUrl + 'getDetail/' + id);
  }
}
