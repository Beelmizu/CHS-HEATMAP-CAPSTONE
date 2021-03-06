import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Area } from '../models/area.model';
import { Camera } from '../models/camera.model';

@Injectable({
  providedIn: 'root'
})
export class CameraDetailService {

  private cameraUrl = 'http://localhost:8080/api/camera/';
  private headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  };
  constructor(private http: HttpClient) { }

  getCameraByID(cameraID: number): Observable<Camera> {
    return this.http.get<Camera>(this.cameraUrl + 'getDetail/' + cameraID);
  }
}
