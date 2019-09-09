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
  zoneID: number;

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
      self.zoneID = params.zoneID;
      if (self.zoneID != null) {
        self.getCameraInZone(this.zoneID);
      }
    });
  }

  ngOnDestroy(): void {
  }

  getCameraInZone(zoneID): void {
    const self = this;
    this.cameraService.getAllCameraInZone(zoneID).subscribe((cameraList) => {
      self.cameras = cameraList;
    }, (error) => {
      console.log(error);
    });
  }

}
