import { Component, OnInit, OnDestroy } from '@angular/core';
import { Camera } from '../../models/camera.model';
import { Router, ActivatedRoute } from '@angular/router';
import { CameraService } from '../../services/camera.service';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { StreamService } from '../../services/stream.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss']
})
export class CameraComponent implements OnInit, OnDestroy {

  cameras: Camera[];
  areaID: number;

  constructor(
    private router: Router,
    private cameraService: CameraService,
    private route: ActivatedRoute,
    private streamService: StreamService,
    private location: Location,
    private toastr: ToastrService
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

  ngOnDestroy(): void {
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
