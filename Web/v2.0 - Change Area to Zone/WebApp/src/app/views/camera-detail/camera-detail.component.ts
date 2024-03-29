import { Component, OnInit, ViewChild, OnDestroy, HostListener } from '@angular/core';
import { Camera } from '../../models/camera.model';
import { Location, DatePipe } from '@angular/common';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { CameraDetailService } from '../../services/camera-detail.service';

import { StreamService } from '../../services/stream.service';
import { Subscription, Observable } from 'rxjs';
import { ReportService } from '../../services/report.service';
import { Report } from '../../models/report.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';


@Component({
  selector: 'app-camera-detail',
  templateUrl: './camera-detail.component.html',
  styleUrls: [
    './camera-detail.component.scss'
  ]
})
export class CameraDetailComponent implements OnInit, OnDestroy {

  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;

  cameraDetail = new Camera;
  heatmapList: Report[];
  cameraID: number;
  choosedTab: String;

  time = 0;
  interval;
  play = false;


  // Socket
  imageSrc: any;
  heatmapSrc: any;
  objectSrc: any;
  previewSrc: any;
  previewHeatmapSrc: any;

  // Subcription
  subImg: Subscription;
  subHeat: Subscription;
  subObject: Subscription;
  subPreview: Subscription;
  subEvent: Subscription;

  stringStatus: string;
  subStatus: Subscription;

  status = '1';

  // Checkbox
  chbHeatmap: boolean;
  chbObject: boolean;

  selectedDate: String = 'noSelected';
  selectedTime: String = 'noSelected';

  listTime: String[];
  myValue = 'Hello world!';

  selectedValueDate = null;

  @HostListener('window:beforeunload', ['$event']) unloadHandler(event: Event) {
    this.disconnectSocket();
    // event.returnValue = true;
  }

  constructor(
    private router: Router,
    private cameraDetailService: CameraDetailService,
    private route: ActivatedRoute,
    private streamService: StreamService,
    private reportService: ReportService,
    private fb: FormBuilder,
    private afStorage: AngularFireStorage,
    private location: Location,
    private toastr: ToastrService
  ) {
  }

  ngOnInit() {
    const self = this;
    // tslint:disable-next-line: max-line-length
    this.listTime = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];

    // set value for stream
    this.choosedTab = 'stream';
    this.chbHeatmap = false;
    this.chbObject = false;

    // get detail camera
    this.route.params.subscribe(params => {
      this.cameraID = params.cameraID;
      if (this.cameraID != null) {
        this.getCameraByID(this.cameraID);
      }
    });

    this.connectSocket();

    // start stream
    this.getImageData();
    this.getHeatmap();
    this.getObject();
  }

  ngOnDestroy() {
    if (this.subImg != null) {
      this.subImg.unsubscribe();
    }
    if (this.subHeat != null) {
      this.subHeat.unsubscribe();
    }
    if (this.subObject != null) {
      this.subObject.unsubscribe();
    }
    if (this.subPreview != null) {
      this.subPreview.unsubscribe();
    }
    if (this.subStatus != null) {
      this.subStatus.unsubscribe();
    }
    // this.subEvent.unsubscribe();
    this.disconnectSocket();
  }

  connectSocket() {
    const self = this;
    this.streamService.connect(this.cameraID);
  }

  disconnectSocket() {
    this.streamService.disconnect();
  }



  // Socket
  getImageData() {
    const self = this;
    this.subImg = this.streamService.getImgSrc(this.cameraID).subscribe((value) => {
      this.imageSrc = `data:image/jpeg;base64,${value}`;
    });
  }

  getHeatmap() {
    const self = this;
    this.subHeat = this.streamService.getHeatmapSrc(this.cameraID).subscribe((heatmap) => {
      this.heatmapSrc = `data:image/png;base64,${heatmap}`;
    });
  }

  getObject() {
    const self = this;
    this.subObject = this.streamService.getObjectSrc(this.cameraID).subscribe((object) => {
      this.objectSrc = `data:image/png;base64,${object}`;
    });
  }

  getPreviewHeatmap(start: String, end: String) {
    const self = this;
    this.subPreview = this.streamService.getPreviewHeatmap(this.cameraID, this.selectedDate, start, end).subscribe((preview) => {
      this.previewHeatmapSrc = `data:image/png;base64,${preview}`;

    });
  }

  // Get detail Camera by ID
  getCameraByID(cameraID): void {
    let userStorageRef;
    const self = this;
    this.cameraDetailService.getCameraByID(cameraID).subscribe((camera) => {
      this.cameraDetail = camera;
      userStorageRef = this.afStorage.ref('' + this.cameraDetail.imageUrl);
      userStorageRef.getDownloadURL().subscribe(url => {
        this.previewSrc = url;
      });
    }, (error) => {
      console.log(error);
    });
  }

  getAllCameraStatus(): void {
    const self = this;
    this.stringStatus = '';

    this.subStatus = this.streamService.getAllStatus().subscribe((status) => {
      this.stringStatus = status;
      const listStatus = this.stringStatus.split(';');
      for (let j = 0; j < listStatus.length; j++) {
        if (+listStatus[j].split(',')[0] === this.cameraID) {
          status = listStatus[j].split(',')[1];
        }
      }
    });

    window.alert(this.status);
    if (this.status === '0') {
      this.location.back();
    }
  }

  disconnectNotify() {
    this.toastr.error('This camera is disconnected !', 'Error');
  }


  catchDate(event) {
    this.selectedDate = event.format('YYYY-MM-DD');
    const self = this;
    this.reportService.getHeatmapListByDate(this.selectedDate, this.cameraDetail.id).subscribe((heatmap) => {
      this.heatmapList = heatmap;
      if (this.heatmapList.length === 0) {
        this.toastr.warning('No data for this date !', 'Warning');
        this.selectedDate = 'nodata';
        this.selectedTime = '';
        this.previewHeatmapSrc = undefined;
      } else {
        this.selectedTime = '';
        this.previewHeatmapSrc = undefined;
      }
    }, (error) => {
      console.log(error);
    });
  }

  chooseTimeForPreview(time: String) {
    const self = this;
    let endTime;
    if (this.selectedDate === 'noSelected') {
      this.toastr.warning('Please choose date !', 'Warning');
    } else if (this.selectedDate === 'nodata') {
      this.toastr.warning('Please choose other date !', 'Warning');
    } else {
      this.selectedTime = time;
      for (let index = 0; index < this.listTime.length - 1; index++) {
        if (this.selectedTime === this.listTime[index]) {
          endTime = this.listTime[index + 1];
        }
      }
      this.getPreviewHeatmap(this.selectedTime, endTime);
      if (this.play === true) {
        this.play = false;
        clearInterval(this.interval);
      }
    }
  }

  playPreview() {
    let i = 0;
    let endTime;
    if (this.selectedDate === 'noSelected') {
      this.toastr.warning('Please choose date !', 'Warning');
    } else if (this.selectedDate === 'nodata') {
      this.toastr.warning('Please choose other date !', 'Warning');
    } else {
      if (this.play === false) {
        this.play = true;
        for (let index = 0; index < this.listTime.length; index++) {
          if (this.listTime[index] === this.selectedTime) {
            i = index;
          }
        }
        this.interval = setInterval(() => {
          endTime = this.listTime[i + 1];
          this.selectedTime = this.listTime[i];
          this.getPreviewHeatmap(this.selectedTime, endTime);
          i++;
        }, 1500);
      } else {
        this.play = false;
        clearInterval(this.interval);
      }
    }
  }

}
