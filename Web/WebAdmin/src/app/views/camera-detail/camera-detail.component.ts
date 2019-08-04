import { Component, OnInit } from '@angular/core';
import { Camera } from '../../models/camera.model';
import { Area } from '../../models/area.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AreaService } from '../../services/area.service';
import { CameraDetailService } from '../../services/camera-detail.service';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-camera-detail',
  templateUrl: './camera-detail.component.html',
  styleUrls: ['./camera-detail.component.scss']
})
export class CameraDetailComponent implements OnInit {

  cameraDetail = new Camera;
  cameraID: number;
  areaID: number;
  areas: Area[];
  cameraDetailForm: FormGroup;

  mode: String;
  isExisted = false;

  constructor(
    private router: Router,
    private cameraDetailService: CameraDetailService,
    private areaService: AreaService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private location: Location,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    const self = this;

    this.getAllArea();

    this.route.params.subscribe(params => {
      this.mode = params.mode;
      this.cameraID = params.idCamera;
      this.areaID = params.idArea;
    });

    this.cameraDetailForm = this.fb.group({
      'cameraID': [''],
      'cameraIP': ['', [Validators.required]],
      'cameraAccount': ['', [Validators.required, Validators.maxLength(45)]],
      'cameraPassword': ['', [Validators.required, Validators.maxLength(45)]],
      'cameraCreatedDate': [''],
      'cameraUpdatedDate': [''],
      'cameraStatus': [''],
      'cameraUpdatedBy': [''],
      'cameraArea': [this.areaID]
    });

    if (this.cameraID != null) {
      // Get camera detail for view detail
      this.getCameraByID(this.cameraID);
    }

  }

  // Get all area
  getAllArea() {
    const self = this;
    this.areaService.getAllArea().subscribe((areaList) => {
      this.areas = areaList;
    }, (error) => {
      console.log(error);
    });
  }

  // Get detail by ID
  getCameraByID(cameraID): void {
    const self = this;
    this.cameraDetailService.getCameraByID(cameraID).subscribe((camera) => {
      this.cameraDetail = camera;
      this.cameraDetailForm.setValue({
        'cameraID': this.cameraDetail.id,
        'cameraIP': this.cameraDetail.ip,
        'cameraAccount': this.cameraDetail.account,
        'cameraPassword': this.cameraDetail.password,
        'cameraCreatedDate': this.cameraDetail.createdDate,
        'cameraUpdatedDate': this.cameraDetail.updatedDate,
        'cameraStatus': this.cameraDetail.status,
        'cameraUpdatedBy': this.cameraDetail.updatedBy,
        'cameraArea': this.cameraDetail.areaID
      });
    }, (error) => {
      console.log(error);
    });
  }

  inactiveCameraByID(): void {
    const self = this;
    if (window.confirm('Do you want to inactive ?')) {
      this.cameraDetailService.inactiveCameraByID(this.cameraDetail).subscribe((message) => {
        if (message) {
          this.toastr.success('Inactive ' + this.cameraDetail.ip + ' successfully !', 'Success');
          this.location.back();
        } else {
          this.toastr.error('Inactive ' + this.cameraDetail.ip + ' unsuccessfully !', 'Error');
        }
      }, (error) => {
        console.log(error);
      });
    } else {
      return;
    }
  }

  activeCameraByID(): void {
    const self = this;
    if (window.confirm('Do you want to active ?')) {
      this.cameraDetailService.activeCameraByID(this.cameraDetail).subscribe((message) => {
        if (message) {
          this.toastr.success('Active ' + this.cameraDetail.ip + ' successfully !', 'Success');
          this.location.back();
        } else {
          this.toastr.error('Active ' + this.cameraDetail.ip + ' unsuccessfully !', 'Error');
        }
      }, (error) => {
        console.log(error);
      });
    } else {
      return;
    }
  }

  updateCameraByID(): void {
    const self = this;
    if (this.valueIsChecked()) {
      this.cameraDetailService.updateCameraByID(this.cameraDetail).subscribe((message) => {
        if (message) {
          this.toastr.success('Update ' + this.cameraDetail.ip + ' successfully !', 'Success');
          this.location.back();
        } else {
          this.toastr.error('Update ' + this.cameraDetail.ip + ' unsuccessfully !', 'Error');
        }
      }, (error) => {
        console.log(error);
      });
    } else {
      this.toastr.warning('Form is not valid', 'Warning');
    }
  }

  addCamera() {
    const self = this;
    if (this.valueIsChecked()) {
      this.cameraDetailService.addNewCamera(this.cameraDetail).subscribe((message) => {
        if (message) {
          this.toastr.success('Create ' + this.cameraDetail.ip + ' successfully !', 'Success');
          this.location.back();
        } else {
          this.toastr.error('This IP is existed', 'Error');
          this.isExisted = true;
        }
      }, (error) => {
        console.log(error);
      });
    } else {
      this.toastr.warning('Form is not valid', 'Warning');
    }
  }

  valueIsChecked(): boolean {
    if (this.cameraDetailForm.valid) {
      if (!this.cameraDetailForm.get('cameraIP').value.valid) {
        this.cameraDetail.ip = this.cameraDetailForm.get('cameraIP').value;
      }
      if (!this.cameraDetailForm.get('cameraAccount').value.valid) {
        this.cameraDetail.account = this.cameraDetailForm.get('cameraAccount').value;
      }
      if (!this.cameraDetailForm.get('cameraPassword').value.valid) {
        this.cameraDetail.password = this.cameraDetailForm.get('cameraPassword').value;
      }
      if (this.mode === 'detail') {
        this.cameraDetail.updatedBy = localStorage.getItem('accountUsername');
      }
      if (this.cameraDetailForm.get('cameraArea').value !== true) {
        this.cameraDetail.areaID = this.cameraDetailForm.get('cameraArea').value;
      } else {
        return false;
      }
      return true;
    } else {
      return false;
    }
  }

  // ---- Check validate when user input (Invalid)
  /* tslint:disable:max-line-length */
  isInvalid(fieldName: string) {
    return this.cameraDetailForm.get(fieldName).invalid
      && (this.cameraDetailForm.get(fieldName).dirty || this.cameraDetailForm.get(fieldName).touched) && this.cameraDetailForm.get(fieldName);
  }

  // ---- Check validate when user input (Invalid)
  isValid(fieldName: string) {
    return this.cameraDetailForm.get(fieldName).valid;
  }

  goBack() {
    this.location.back();
  }

}
