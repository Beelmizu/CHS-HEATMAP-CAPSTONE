import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Camera } from '../../models/camera.model';
import { Location, DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { CameraDetailService } from '../../services/camera-detail.service';

import { StreamService } from '../../services/stream.service';
import { Subscription, Observable } from 'rxjs';
import { ReportService } from '../../services/report.service';
import { Report } from '../../models/report.model';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-camera-detail',
  templateUrl: './camera-detail.component.html',
  styleUrls: [
    './camera-detail.component.scss'
  ]
})
export class CameraDetailComponent implements OnInit, OnDestroy {

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

  // Subcription
  subImg: Subscription;
  subHeat: Subscription;
  subObject: Subscription;
  subPreview: Subscription;

  // Checkbox
  chbHeatmap: boolean;
  chbObject: boolean;

  selectedDate: String = 'noSelected';
  selectedTime: String = 'noSelected';

  listTime: String[];

  constructor(
    private router: Router,
    private cameraDetailService: CameraDetailService,
    private route: ActivatedRoute,
    private streamService: StreamService,
    private reportService: ReportService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    const self = this;
    this.listTime = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];

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

    // start stream
    this.getImageData();
    this.getHeatmap();
    this.getObject();

  }

  ngOnDestroy() {
    this.subImg.unsubscribe();
    this.subHeat.unsubscribe();
    this.subObject.unsubscribe();
    // this.subPreview.unsubscribe();
  }

  // Socket
  getImageData() {
    const self = this;
    this.subImg = this.streamService.getImgSrc().subscribe((value) => {
      this.imageSrc = `data:image/jpeg;base64,${value}`;
    });
  }

  getHeatmap() {
    const self = this;
    this.subHeat = this.streamService.getHeatmapSrc().subscribe((heatmap) => {
      this.heatmapSrc = `data:image/png;base64,${heatmap}`;
    });
  }

  getObject() {
    const self = this;
    this.subObject = this.streamService.getObjectSrc().subscribe((object) => {
      this.objectSrc = `data:image/png;base64,${object}`;
    });
  }

  getPreviewHeatmap(start: String, end: String) {
    const self = this;
    this.subPreview = this.streamService.getPreviewHeatmap(this.cameraID, this.selectedDate, start, end).subscribe((preview) => {
      this.previewSrc = `data:image/png;base64,${preview}`;
    });
  }

  // Get detail Camera by ID
  getCameraByID(cameraID): void {
    const self = this;
    this.cameraDetailService.getCameraByID(cameraID).subscribe((camera) => {
      self.cameraDetail = camera;
    }, (error) => {
      console.log(error);
    });
  }

  catchDate(event) {
    this.selectedDate = event.format('YYYY-MM-DD');
    const self = this;
    this.reportService.getHeatmapListByDate(this.selectedDate, this.cameraDetail.id).subscribe((heatmap) => {
      this.heatmapList = heatmap;
      if (this.heatmapList.length === 0) {
        window.alert('No data for this day !');
        this.selectedDate = 'noSelected';
      }
    }, (error) => {
      console.log(error);
    });
  }

  chooseTimeForPreview(time: String) {
    const self = this;
    let endTime;
    if (this.selectedDate !== 'noSelected') {
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
    } else {
      window.alert('Please choose date !');
    }
  }

  playPreview() {
    let i = 0;
    if (this.selectedDate !== 'noSelected') {
      if (this.play === false) {
        this.play = true;
        for (let index = 0; index < this.listTime.length; index++) {
          if (this.listTime[index] === this.selectedTime) {
            i = index;
          }
        }
        this.interval = setInterval(() => {
          this.selectedTime = this.listTime[i];
          i++;
        }, 2000);
      } else {
        this.play = false;
        clearInterval(this.interval);
      }
    } else {
      window.alert('Please choose date !');
    }
  }

}