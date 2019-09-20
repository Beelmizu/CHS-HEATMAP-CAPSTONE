import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Socket } from '../shared/interfaces';
import * as socketIo from 'socket.io-client';


@Injectable({
  providedIn: 'root'
})
export class StreamService {

  socket: Socket;
  observerImg: Observer<any>;
  observerHeatmap: Observer<any>;
  observerObject: Observer<any>;
  observerPreview: Observer<any>;
  obStatus: Observer<any>;


  constructor() {
    this.socket = io('http://127.0.0.1:5000');
  }

  connect(cameraID: number) {
    this.socket.emit('stream_camera', '' + cameraID);
  }

  disconnect() {
    this.socket.emit('stop_stream', function () {
      console.log('Connection disconnected');
    });
  }


  // Image -----------------------------------
  getImgSrc(id: number): Observable<any> {
    this.socket.on('stream_camera_' + id, (image) => {
      this.observerImg.next(image);
    });

    return this.createObservable();
  }

  createObservable(): Observable<any> {
    return new Observable(observer => {
      this.observerImg = observer;
    });
  }

  // Heatmap -----------------------------
  getHeatmapSrc(id: number): Observable<any> {
    this.socket.on('stream_heatmap_' + id, (heatmap) => {
      this.observerHeatmap.next(heatmap);
    });

    return this.createObservableHeatmap();
  }

  createObservableHeatmap(): Observable<any> {
    return new Observable(observer => {
      this.observerHeatmap = observer;
    });
  }

  // Object ------------------------------
  getObjectSrc(id: number): Observable<any> {
    this.socket.on('stream_object_' + id, (object) => {
      this.observerObject.next(object);
    });

    return this.createObservableObject();
  }

  createObservableObject(): Observable<any> {
    return new Observable(observer => {
      this.observerObject = observer;
    });
  }

  // Get preview heatmap
  getPreviewHeatmap(cameraID: number, date: String, start: String, end: String): Observable<any> {
    this.socket.emit('preview_heatmap', cameraID + ';' + date + ' ' + start + ',' + date + ' ' + end);

    this.createObservablePreview();
    this.socket.on('preview_heatmap', (object) => {
      this.observerPreview.next(object);
    });
    return this.createObservablePreview();
  }

  // getPreviewHeatmap(cameraID: number, date: String, start: String, end: String): any {
  //   let result: String;
  //   this.socket.emit('preview_heatmap', cameraID + ';' + date + ' ' + start + ',' + date + ' ' + end);

  //   this.socket.on('preview_heatmap', (object) => {
  //    result = object;
  //    return result;
  //   });
  // }

  createObservablePreview(): Observable<any> {
    return new Observable(observer => {
      this.observerPreview = observer;
    });
  }

  // get all Status
  getAllStatus(): Observable<any> {
    this.socket.emit('get_all_camera_status', '');
    this.socket.on('get_all_camera_status', (stringStatus) => {
      this.obStatus.next(stringStatus);
    });

    return this.createObservableStatus();
  }

  createObservableStatus(): Observable<any> {
    return new Observable(observer => {
      this.obStatus = observer;
    });
  }
}
