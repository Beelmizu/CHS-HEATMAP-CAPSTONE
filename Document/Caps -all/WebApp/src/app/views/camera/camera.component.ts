import { Component, OnInit } from '@angular/core';
import { Camera } from '../../models/camera.model';
import { Router, ActivatedRoute } from '@angular/router';
import { CameraService } from '../../services/camera.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss']
})
export class CameraComponent implements OnInit {

  cameras: Camera[];
  areaID: number;


  constructor(
    private router: Router,
    private cameraService: CameraService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    const self = this;

    self.route.params.subscribe(params => {
      self.areaID = params.areaID;
      if (self.areaID != null) {
        self.getCameraInArea(this.areaID);
      }
    });
  }

  getCameraInArea(areaID): void {
    const self = this;
    this.cameraService.getAllCameraInArea(areaID).subscribe((cameraList) => {
      self.cameras = cameraList;
    }, (error) => {
      console.log(error);
    });
  }

}
