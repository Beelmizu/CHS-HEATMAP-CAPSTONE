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

  getAllCameraInArea(areaID: number): Observable<Camera[]> {
    return this.http.get<Camera[]>(this.cameraUrl + 'getCameraInArea/' + areaID);
  }

  getCameraByValue(searchValue: String, areaID: number): Observable<Camera[]> {
    return this.http.get<Camera[]>(this.cameraUrl + 'search/' + searchValue + '/' + areaID);
  }

  getAllCameraByPage(pageNumber: number): Observable<Page> {
    return this.http.get<Page>(this.cameraUrl + 'getAllCameraByPage/' + pageNumber);
  }

}
