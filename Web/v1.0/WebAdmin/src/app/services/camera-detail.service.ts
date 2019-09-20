import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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

  inactiveCameraByID(camera: Camera): Observable<any> {
    return this.http.post<any>(this.cameraUrl + 'inactive/', camera);
  }

  activeCameraByID(camera: Camera): Observable<any> {
    return this.http.post<any>(this.cameraUrl + 'active/', camera);
  }

  updateCameraByID(camera: Camera): Observable<any> {
    return this.http.post<any>(this.cameraUrl + 'update/', camera);
  }

  addNewCamera(camera: Camera): Observable<any> {
    return this.http.post<any>(this.cameraUrl + 'create/',  camera);
  }

  deleteCamera(cameraID: number): Observable<any> {
    let body = new HttpParams();
    body = body.set('cameraID', '' + cameraID);
    return this.http.post<any>(this.cameraUrl + 'deleteCamera/', body);
  }
}
