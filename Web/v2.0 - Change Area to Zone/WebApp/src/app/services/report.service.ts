import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Report } from '../models/report.model';
import { HttpClient } from '@angular/common/http';
import { Camera } from '../models/camera.model';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  // private messageSource = new BehaviorSubject('default message');
  // currentMessage = this.messageSource.asObservable();


  private reportUrl = 'http://localhost:8080/api/report/';
  private headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  };

  constructor(private http: HttpClient) { }

  getReportByDate(selectedDate: String, cameraID: number): Observable<Report[]> {
    return this.http.get<Report[]>(this.reportUrl + 'getReportByDate/' + selectedDate + '/' + cameraID);
  }

  getReportByTime(selectedDate: String, cameraID: number, timeFrom: String, timeTo: String): Observable<Report[]> {
    return this.http.get<Report[]>(this.reportUrl + 'getReportByTime/' + selectedDate + '/'
                                                                       + cameraID + '/'
                                                                       + timeFrom + '/'
                                                                       + timeTo + '/');
  }

  getReportZoneByTime(selectedDate: String, araID: number, timeFrom: String, timeTo: String): Observable<any[]> {
    return this.http.get<any[]>(this.reportUrl + 'getReportZoneByTime/' + selectedDate + '/'
                                                                       + araID + '/'
                                                                       + timeFrom + '/'
                                                                       + timeTo);
  }

  getReportStoreByTime(selectedDate: String, storeID: number, timeFrom: String, timeTo: String): Observable<any[]> {
    return this.http.get<any[]>(this.reportUrl + 'getReportStoreByTime/' + selectedDate + '/'
                                                                       + storeID + '/'
                                                                       + timeFrom + '/'
                                                                       + timeTo);
  }

  getReportAgeGenderStoreByTime(selectedDate: String, storeID: number, timeFrom: String, timeTo: String): Observable<any[]> {
    return this.http.get<any[]>(this.reportUrl + 'getReportAgeGenderStoreByTime/' + selectedDate + '/'
                                                                       + storeID + '/'
                                                                       + timeFrom + '/'
                                                                       + timeTo);
  }

  getReportByMonth(selectedMonth: String, cameraID: number): Observable<Report[]> {
    return this.http.get<Report[]>(this.reportUrl + 'getReportByMonth/' + selectedMonth + '/' + cameraID);
  }

  getHeatmapListByDate(selectedDate: String, cameraID: number): Observable<Report[]> {
    return this.http.get<Report[]>(this.reportUrl + 'getHeatmapByDate/' + selectedDate + '/' + cameraID);
  }

  getReportZoneByMonth(selectedMonth: String, zoneID: number): Observable<any[]> {
    return this.http.get<any[]>(this.reportUrl + 'getReportZoneByMonth/' + selectedMonth + '/' + zoneID);
  }

  getReportStoreByMonth(selectedMonth: String, storeID: number): Observable<any[]> {
    return this.http.get<any[]>(this.reportUrl + 'getReportStoreByMonth/' + selectedMonth + '/' + storeID);
  }

  getReportAgeGenderStoreByMonth(selectedMonth: String, storeID: number): Observable<any[]> {
    return this.http.get<any[]>(this.reportUrl + 'getReportAgeGenderStoreByMonth/' + selectedMonth + '/' + storeID);
  }

}
