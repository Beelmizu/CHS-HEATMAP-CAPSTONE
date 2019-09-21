import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Socket } from '../shared/interfaces';
import * as socketIo from 'socket.io-client';
@Injectable({
  providedIn: 'root'
})
export class SocketConnectService {

  socket: Socket;
  obStatus: Observer<any>;

  constructor() {
    this.socket = socketIo('http://127.0.0.1:5000');
  }

  // get all Status
  getAllStatus(): Observable<any> {
    this.socket.emit('get_all_camera_status', '');
    this.socket.on('get_all_camera_status', (stringStatus) => {
      this.obStatus.next(stringStatus);
    });

    return this.createObservable();
  }

  createObservable(): Observable<any> {
    return new Observable(observer => {
      this.obStatus = observer;
    });
  }

  deleteCamera(cameraID: number) {
    this.socket.emit('delete_camera', cameraID);
  }

}
