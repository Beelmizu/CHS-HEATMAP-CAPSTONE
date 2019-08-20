import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subscription } from 'rxjs';
import { CameraDetailService } from '../../services/camera-detail.service';
import { Camera } from '../../models/camera.model';
import { StreamService } from '../../services/stream.service';

@Component({
  selector: 'app-view-heatmap-dialog',
  templateUrl: './view-heatmap-dialog.component.html',
  styleUrls: ['./view-heatmap-dialog.component.scss']
})
export class ViewHeatmapDialogComponent implements OnInit, OnDestroy {

  date: any;
  cameraDetail: Camera;
  cameraID: number;
  from: any;
  to: any;
  previewSrc: any;
  previewHeatmapSrc: any;
  subPreview: Subscription;

  constructor(
    private streamService: StreamService,
    private cameraDetailService: CameraDetailService,
    private dialogRef: MatDialogRef<ViewHeatmapDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.date = data.date;
    this.cameraID = data.id;
    this.from = data.from;
    this.to = data.to;
  }

  ngOnInit() {
    this.getCameraByID(this.cameraID);
    this.connectSocket();
  }

  ngOnDestroy(): void {
    if (this.subPreview != null) {
      this.subPreview.unsubscribe();
    }
  }

  connectSocket() {
    const self = this;
    this.streamService.connect(this.cameraID);
  }
  getCameraByID(cameraID): void {
    const self = this;
    this.cameraDetailService.getCameraByID(cameraID).subscribe((camera) => {
      self.cameraDetail = camera;
      this.previewSrc = this.cameraDetail.imageUrl;
    }, (error) => {
      console.log(error);
    });
  }

  close() {
    this.dialogRef.close();
  }

  getPreviewHeatmap(start: String, end: String) {
    const self = this;
    this.subPreview = this.streamService.getPreviewHeatmap(this.cameraID, this.date, this.from, this.to).subscribe((preview) => {
      this.previewHeatmapSrc = `data:image/png;base64,${preview}`;
    });
  }

}
