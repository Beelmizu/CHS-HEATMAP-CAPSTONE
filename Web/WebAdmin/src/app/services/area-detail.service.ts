import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Area } from '../models/area.model';

@Injectable({
  providedIn: 'root'
})
export class AreaDetailService {

  private areaUrl = 'http://localhost:8080/api/area/';
  private headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  };
  constructor(private http: HttpClient) { }

  getAreaByID(areaID: number): Observable<Area> {
    return this.http.get<Area>(this.areaUrl + 'getDetail/' + areaID);
  }

  inactiveAreaByID(area: Area): Observable<any> {
    return this.http.post<any>(this.areaUrl + 'inactive/', area);
  }

  activeAreaByID(area: Area): Observable<any> {
    return this.http.post<any>(this.areaUrl + 'active/', area);
  }

  updateAreaByID(area: Area): Observable<any> {
    return this.http.post<any>(this.areaUrl + 'update/', area);
  }

 addNewArea(area: Area): Observable<any> {
    return this.http.post<any>(this.areaUrl + 'create/',  area);
  }
}
