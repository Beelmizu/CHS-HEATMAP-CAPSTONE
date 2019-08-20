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


  constructor() {
    this.socket =  socketIo('http://192.168.1.11:5000');
  }

  connect(cameraID: number) {
    this.socket.emit('stream_camera', '' + cameraID);
  }

  // Image -----------------------------------
  getImgSrc(): Observable<any> {
    this.socket.on('stream_camera', (image) => {
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
  getHeatmapSrc(): Observable<any> {
    this.socket.on('stream_heatmap', (heatmap) => {
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
  getObjectSrc(): Observable<any> {
    this.socket.on('stream_object', (object) => {
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
    this.socket.on('preview_heatmap', (object) => {
      this.observerPreview.next(object);
    });
    return this.createObservablePreview();
  }

  createObservablePreview(): Observable<any> {
    return new Observable(observer => {
      this.observerPreview = observer;
    });
  }
}
