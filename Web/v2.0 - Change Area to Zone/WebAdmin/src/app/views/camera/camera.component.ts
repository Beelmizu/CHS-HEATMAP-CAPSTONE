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
  zoneID: number;

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
      this.zoneID = params.idZone;
      if (this.zoneID != null) {
        this.getCameraInZone(this.zoneID);
      }
    });
  }

  getCameraInZone(zoneID): void {
    const self = this;
    this.cameraService.getAllCameraInZone(zoneID).subscribe((cameraList) => {
      this.cameras = cameraList;
    }, (error) => {
      console.log(error);
    });
  }

  searchCameraByValue(searchValue: String): void {
    const self = this;
    if (searchValue === '') {
      this.getCameraInZone(this.zoneID);
    } else {
      this.cameraService.getCameraByValue(searchValue, this.zoneID).subscribe((cameraList) => {
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
