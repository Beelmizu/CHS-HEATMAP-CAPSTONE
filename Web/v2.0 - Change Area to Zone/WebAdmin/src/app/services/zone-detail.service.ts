import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Zone } from '../models/zone.model';

@Injectable({
  providedIn: 'root'
})
export class ZoneDetailService {

  private zoneUrl = 'http://localhost:8080/api/zone/';
  private headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  };
  constructor(private http: HttpClient) { }

  getZoneByID(zoneID: number): Observable<Zone> {
    return this.http.get<Zone>(this.zoneUrl + 'getDetail/' + zoneID);
  }

  inactiveZoneByID(zone: Zone): Observable<any> {
    return this.http.post<any>(this.zoneUrl + 'inactive/', zone);
  }

  activeZoneByID(zone: Zone): Observable<any> {
    return this.http.post<any>(this.zoneUrl + 'active/', zone);
  }

  updateZoneByID(zone: Zone): Observable<any> {
    return this.http.post<any>(this.zoneUrl + 'update/', zone);
  }

 addNewZone(zone: Zone): Observable<any> {
    return this.http.post<any>(this.zoneUrl + 'create/',  zone);
  }
}
