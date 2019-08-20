import { Component, OnInit } from '@angular/core';
import { CameraService } from '../../services/camera.service';
import { Camera } from '../../models/camera.model';
import { Pipe, PipeTransform } from '@angular/core';
import * as $ from 'jquery';
import 'datatables.net';
import { DataTable } from 'angular-6-datatable';
@Component({
  selector: 'app-check-camera',
  templateUrl: './check-camera.component.html',
  styleUrls: ['./check-camera.component.scss']
})

@Pipe({
  name: 'FilterPipe',
})
export class CheckCameraComponent implements OnInit, PipeTransform {



  cameras: Camera[];
  dt: DataTable;
  selectedOption: number;
  totalItems: number;
  searchText;
  selectedEntities: any[];
  from = 1;
  end = 5;
  cameraFilter: any = { area: { store: { name: '' } } };

  constructor(private cameraService: CameraService) { }

  ngOnInit() {
    this.selectedOption = 5;
    this.getCamera();
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

  getCamera(): void {
    const self = this;
    this.cameraService.getAllCamera().subscribe((cameraList) => {
      this.cameras = cameraList;
    }, (error) => {
      console.log(error);
    });
  }

}
