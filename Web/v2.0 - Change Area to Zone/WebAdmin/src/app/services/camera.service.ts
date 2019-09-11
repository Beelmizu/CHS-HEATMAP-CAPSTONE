import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Camera } from '../models/camera.model';
import { Page } from '../models/page.model';

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  private cameraUrl = 'http://localhost:8080/api/camera/';
  private headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  };

  constructor(private http: HttpClient) {
  }

  getAllCamera(): Observable<Camera[]> {
    return this.http.get<Camera[]>(this.cameraUrl + 'getAll');
  }

  getAllCameraToCheck(): Observable<Camera[]> {
    return this.http.get<Camera[]>(this.cameraUrl + 'getAll');
  }

  getAllCameraInZone(zoneID: number): Observable<Camera[]> {
    return this.http.get<Camera[]>(this.cameraUrl + 'getCameraInZone/' + zoneID);
  }

  getCameraByValue(searchValue: String, zoneID: number): Observable<Camera[]> {
    return this.http.get<Camera[]>(this.cameraUrl + 'search/' + searchValue + '/' + zoneID);
  }

  getAllCameraByPage(pageNumber: number): Observable<Page> {
    return this.http.get<Page>(this.cameraUrl + 'getAllCameraByPage/' + pageNumber);
  }

}
