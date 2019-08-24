import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Camera } from '../../models/camera.model';
import { Subscription, Observable, Subject } from 'rxjs';
import { StreamService } from '../../services/stream.service';
import { CameraDetailService } from '../../services/camera-detail.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CameraService } from '../../services/camera.service';
import { first } from 'rxjs/operators';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';

@Component({
  selector: 'app-view-heatmap-dialog-area',
  templateUrl: './view-heatmap-dialog-area.component.html',
  styleUrls: ['./view-heatmap-dialog-area.component.scss']
})
export class ViewHeatmapDialogAreaComponent implements OnInit, OnDestroy {

  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;

  date: any;
  listCameraDetail: Camera[];
  cameraID: number;
  areaID: number;
  from: any;
  to: any;
  previewSrc: any;
  previewHeatmapSrc: any;
  subPreview: Subscription;
  subCamera: Subscription;
  imgPreview: String;


  constructor(
    private streamService: StreamService,
    private cameraService: CameraService,
    private afStorage: AngularFireStorage,
    private cameraDetailService: CameraDetailService,
    private dialogRef: MatDialogRef<ViewHeatmapDialogAreaComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.date = data.date;
    this.areaID = data.idArea;
    this.from = data.from;
    this.to = data.to;
  }

  ngOnInit() {
    this.getAllDetail();
  }

  ngOnDestroy(): void {
  }

  getCamera() {
    return new Promise(resolve => {
      this.cameraService.getAllCameraInArea(this.areaID)
        .subscribe(data => {
          this.listCameraDetail = data;
          resolve(this.listCameraDetail);
        });
    });
  }

  getAllDetail() {
    const self = this;
    let img;
    let userStorageRef;
    this.getCamera().then((data: any[]) => {
      for (let i = 0; i < data.length; i++) {
        userStorageRef = this.afStorage.ref('' + data[i].imageUrl);
        userStorageRef.getDownloadURL().subscribe(url => {
          this.listCameraDetail[i].imageUrl = url;
        });
      }
      for (let i = 0; i < data.length; i++) {
        window.alert(data[i].id);
        this.subPreview = this.streamService.getPreviewHeatmap(data[i].id, this.date, this.from, this.to).subscribe((data) => {
          this.listCameraDetail[i].imagePreview = `data:image/png;base64,${data}`;
          return;
        });
        return () => {
          // this.subPreview.unsubscribe();
          // return;
        };

        // this.getPreviewHeatmap(data[i].id).subscribe(image => {
        //   // window.alert(image);
        //   window.alert(data[i].id + ' ---- ' + image);
        //   this.listCameraDetail[i].imagePreview = `data:image/png;base64,${image}`;
        // });
        // img = this.getPreviewHeatmap(data[i].id);
        // window.alert(data[i].id + ' --- ' + this.getPreviewHeatmap(data[i].id)window.);
        // this.listCameraDetail[i].imagePreview = `data:image/png;base64,${img}`;
      }
    });
  }

  getPreviewHeatmap(id: number) {
    return this.streamService.getPreviewHeatmap(id, this.date, this.from, this.to);
  }

  getPreview(id) {
    return new Promise(resolve => {
      this.streamService.getPreviewHeatmap(id, this.date, this.from, this.to).subscribe(
        preview => {
          this.imgPreview = `data:image/png;base64,${preview}`;
          resolve(this.imgPreview);
        });
    });
  }


  close() {
    this.dialogRef.close();
  }

}
