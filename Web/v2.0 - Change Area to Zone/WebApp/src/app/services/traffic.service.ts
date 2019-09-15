import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TrafficService {

  private trafficUrl = 'http://localhost:8080/api/traffic/';
  private headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  };

  constructor(private http: HttpClient) { }

  getReportTrafficByTime(selectedDate: String, storeID: number): Observable<any[]> {
    return this.http.get<any[]>(this.trafficUrl + 'getReportTrafficByTime/' + selectedDate + '/'
                                                                       + storeID);
  }

  getReportTrafficByMonth(selectedMonth: String, storeID: number): Observable<any[]> {
    return this.http.get<any[]>(this.trafficUrl + 'getReportTrafficByMonth/' + selectedMonth + '/' + storeID);
  }

  
}
