import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Camera } from '../../models/camera.model';
import { Subscription } from 'rxjs';
import { StreamService } from '../../services/stream.service';
import { CameraDetailService } from '../../services/camera-detail.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CameraService } from '../../services/camera.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-view-heatmap-dialog-area',
  templateUrl: './view-heatmap-dialog-area.component.html',
  styleUrls: ['./view-heatmap-dialog-area.component.scss']
})
export class ViewHeatmapDialogAreaComponent implements OnInit, OnDestroy {


  date: any;
  listCameraDetail: Camera[];
  cameraID: number;
  areaID: number;
  from: any;
  to: any;
  previewSrc: any;
  previewHeatmapSrc: any;
  subPreview: Subscription;

  constructor(
    private streamService: StreamService,
    private cameraService: CameraService,
    private cameraDetailService: CameraDetailService,
    private dialogRef: MatDialogRef<ViewHeatmapDialogAreaComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.date = data.date;
    this.areaID = data.idArea;
    this.from = data.from;
    this.to = data.to;
  }

  ngOnInit() {
    this.getCameraByID();
  }

  ngOnDestroy(): void {
  }


  getCameraByID(): void {
    const self = this;
    let listCameraToView: Camera[];
    this.cameraService.getAllCameraInArea(this.areaID).subscribe((cameras) => {
      this.listCameraDetail = cameras;
      listCameraToView = cameras;
      for (let i = 0; i < listCameraToView.length; i++) {

        this.streamService.getPreviewHeatmap(listCameraToView[i].id, this.date, this.from, this.to).pipe(
          first()
        ).subscribe(
          preview => { this.listCameraDetail[i].imagePreview = `data:image/png;base64,${preview}`;
          console.log(this.listCameraDetail[i].id + '---' + this.listCameraDetail[i].imagePreview);
         });
      }
    }, (error) => {
      console.log(error);
    });
  }

  close() {
    this.dialogRef.close();
  }

  getPreviewHeatmap(id: number) {
    const self = this;
    console.log(id);
    console.log(this.date);

    this.subPreview = this.streamService.getPreviewHeatmap(id, this.date, this.from, this.to).subscribe((preview) => {
      this.previewHeatmapSrc = `data:image/png;base64,${preview}`;
      console.log(`data:image/png;base64,${preview}`);
    });
  }
}
