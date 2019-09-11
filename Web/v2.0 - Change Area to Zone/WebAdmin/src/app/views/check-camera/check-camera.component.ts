import { Component, OnInit, OnDestroy } from '@angular/core';
import { CameraService } from '../../services/camera.service';
import { Camera } from '../../models/camera.model';
import { Pipe, PipeTransform } from '@angular/core';
import * as $ from 'jquery';
import 'datatables.net';
import { SocketConnectService } from '../../services/socket-connect.service';
import { DataTable } from 'angular-6-datatable';
import { Subscription, Observable } from 'rxjs';
import { timer } from 'rxjs';

@Component({
  selector: 'app-check-camera',
  templateUrl: './check-camera.component.html',
  styleUrls: ['./check-camera.component.scss']
})

@Pipe({
  name: 'FilterPipe',
})
export class CheckCameraComponent implements OnInit, PipeTransform, OnDestroy {

  cameras: Camera[];
  dt: DataTable;
  selectedOption: number;
  stringStatus: string;
  totalItems: number;
  searchText;
  selectedEntities: any[];
  from = 1;
  end = 5;
  cameraFilter: any = { zone: { store: { name: '' } } };

  subStatus: Subscription;

  constructor(
    private cameraService: CameraService,
    private socketService: SocketConnectService
  ) { }

  ngOnInit() {
    this.selectedOption = 10;
    this.getAllCamera();
  }

  ngOnDestroy(): void {
    if (this.subStatus != null) {
      this.subStatus.unsubscribe();
    }
  }

  getAllCamera() {
    const self = this;
    let listCamera: Camera[];
    this.cameraService.getAllCamera().subscribe((cameraList) => {
      listCamera = cameraList;
      this.getAllCameraStatus(listCamera);
      setInterval(() => this.getAllCameraStatus(listCamera), 5000);
    }, (error) => {
      console.log(error);
    });

  }

  getAllCameraStatus(list: Camera[]): void {
    const self = this;
    this.stringStatus = '';

    this.subStatus = this.socketService.getAllStatus().subscribe((status) => {
      this.stringStatus = status;
      const listStatus = this.stringStatus.split(';');
      for (let i = 0; i < list.length; i++) {
        for (let j = 0; j < listStatus.length; j++) {
          if (+listStatus[j].split(',')[0] === list[i].id) {
            list[i].status = listStatus[j].split(',')[1];
          }
        }
      }
    });
    this.cameras = list;
  }



  transform(value: any, input: string) {
    window.alert(input);
    if (input) {
      input = input.toLowerCase();
      return value.filter(function (el: any) {
        return el.toLowerCase().indexOf(input) > -1;
      });
    }
    return value;
  }

  getAllCameraByPage(page: number): void {
    const self = this;
    this.cameraService.getAllCameraByPage(page - 1).subscribe((res) => {
      this.cameras = res.content;
      this.totalItems = res.totalElements;
    }, (error) => {
      console.log(error);
    });
  }

}
