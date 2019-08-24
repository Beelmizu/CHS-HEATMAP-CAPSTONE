import { Component, OnInit } from '@angular/core';
import { Camera } from '../../models/camera.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CameraService } from '../../services/camera.service';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss']
})
export class CameraComponent implements OnInit {

  cameras: Camera[];
  cameraForm: FormGroup;
  areaID: number;

  constructor(
    private router: Router,
    private cameraService: CameraService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private location: Location,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    const self = this;

    this.cameraForm = this.fb.group({
      'searchValue': ''
    });

    this.route.params.subscribe(params => {
      this.areaID = params.idArea;
      if (this.areaID != null) {
        this.getCameraInArea(this.areaID);
      }
    });
  }

  getCameraInArea(areaID): void {
    const self = this;
    this.cameraService.getAllCameraInArea(areaID).subscribe((cameraList) => {
      this.cameras = cameraList;
    }, (error) => {
      console.log(error);
    });
  }

  searchCameraByValue(searchValue: String): void {
    const self = this;
    if (searchValue === '') {
      this.getCameraInArea(this.areaID);
    } else {
      this.cameraService.getCameraByValue(searchValue, this.areaID).subscribe((cameraList) => {
        if (cameraList.length === 0) {
          this.toastr.warning('Cannot find camera by value!', 'Warning');
        } else {
          this.cameras = cameraList;
        }
      }, (error) => {
        console.log(error);
      });
    }
  }

}
