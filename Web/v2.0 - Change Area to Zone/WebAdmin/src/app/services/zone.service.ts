import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Zone } from '../models/zone.model';

@Injectable({
  providedIn: 'root'
})
export class ZoneService {

  private zoneUrl = 'http://localhost:8080/api/zone/';
  private headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  };

  constructor(private http: HttpClient) {
  }

  getAllZone(): Observable<Zone[]> {
    return this.http.get<Zone[]>(this.zoneUrl + 'getAll');
  }

  getAllZoneInStore(storeID: number): Observable<Zone[]> {
    return this.http.get<Zone[]>(this.zoneUrl + 'getZoneInStore/' + storeID);
  }

  getZoneByValue(searchValue: String, storeID: number): Observable<Zone[]> {
    return this.http.get<Zone[]>(this.zoneUrl + 'search/' + searchValue + '/' + storeID);
  }
}
