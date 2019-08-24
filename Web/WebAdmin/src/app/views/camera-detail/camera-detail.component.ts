import { Component, OnInit } from '@angular/core';
// import { SocketConnectService } from '../../services/socket-connect.service';
import { Camera } from '../../models/camera.model';
import { Area } from '../../models/area.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AreaService } from '../../services/area.service';
import { SocketConnectService } from '../../services/socket-connect.service';
import { CameraDetailService } from '../../services/camera-detail.service';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';

class ImageSnippet {
  constructor(public src: string, public file: File) { }
}

@Component({
  selector: 'app-camera-detail',
  templateUrl: './camera-detail.component.html',
  styleUrls: ['./camera-detail.component.scss']
})
export class CameraDetailComponent implements OnInit {

  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;

  eventUpload: any;

  cameraDetail = new Camera;
  cameraID: number;
  areaID: number;
  areas: Area[];
  cameraDetailForm: FormGroup;
  url: String = 'empty';

  mode: String;
  isExisted = false;

  selectedFile: ImageSnippet;
  uploadState: Observable<string>;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;
  idImage: string;


  constructor(
    private router: Router,
    // private socketService: SocketConnectService,
    private socketService: SocketConnectService,
    private cameraDetailService: CameraDetailService,
    private areaService: AreaService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private location: Location,
    private afStorage: AngularFireStorage,
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
      'cameraName': ['', [Validators.required]],
      'cameraIP': ['', [Validators.required]],
      'cameraAccount': ['', [Validators.required, Validators.maxLength(45)]],
      'cameraPassword': ['', [Validators.required, Validators.maxLength(45)]],
      'cameraCreatedDate': [''],
      'cameraUpdatedDate': [''],
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
    let userStorageRef;
    const reader = new FileReader();
    const self = this;
    this.cameraDetailService.getCameraByID(cameraID).subscribe((camera) => {
      this.cameraDetail = camera;
      userStorageRef = this.afStorage.ref('' + this.cameraDetail.imageUrl);
      this.cameraDetailForm.setValue({
        'cameraID': this.cameraDetail.id,
        'cameraName': this.cameraDetail.name,
        'cameraIP': this.cameraDetail.ip,
        'cameraAccount': this.cameraDetail.account,
        'cameraPassword': this.cameraDetail.password,
        'cameraCreatedDate': this.cameraDetail.createdDate,
        'cameraUpdatedDate': this.cameraDetail.updatedDate,
        'cameraUpdatedBy': this.cameraDetail.updatedBy,
        'cameraArea': this.cameraDetail.areaID
      });
      userStorageRef.getDownloadURL().subscribe(url => {
        this.url = url;
      });
    }, (error) => {
      console.log(error);
    });
  }


  deleteCameraByID(): void {
    const self = this;
    if (window.confirm('Do you want to delete this camera ?')) {
      this.cameraDetailService.deleteCamera(this.cameraDetail.id).subscribe((message) => {
        if (message) {
          this.toastr.success('Delete ' + this.cameraDetail.ip + ' successfully !', 'Success');
          this.socketService.deleteCamera(this.cameraDetail.id);
          this.location.back();
        } else {
          this.toastr.error('Delete ' + this.cameraDetail.ip + ' unsuccessfully !', 'Error');
        }
      }, (error) => {
        console.log(error);
      });
    } else {
      return;
    }
  }

  uploadToFirebase() {
    const self = this;
    const id = this.cameraID + '_camera';
    this.idImage = id;
    this.ref = this.afStorage.ref('/camera/' + id);
    this.task = this.ref.put(this.eventUpload.target.files[0]);
    this.uploadProgress = this.task.percentageChanges();
    console.log('Image uploaded!');
   this.task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = this.ref.getDownloadURL();
        console.log(this.downloadURL);
        this.downloadURL.subscribe(url => (this.url = url));
      })
    )
      .subscribe();
  }

  updateCameraByID(): void {
    const promises = [];
    const self = this;
    const id = this.cameraID + '_camera';
    this.idImage = id;
    this.ref = this.afStorage.ref('/camera/' + id);
    this.task = this.ref.put(this.eventUpload.target.files[0]);
    promises.push(this.task);
    this.uploadProgress = this.task.percentageChanges();
    console.log('Image uploaded!');
    this.task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = this.ref.getDownloadURL();
        console.log(this.downloadURL);
        this.downloadURL.subscribe(url => (this.url = url));
      })
    )
      .subscribe();
    Promise.all(promises).then(tasks => {
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
    });
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

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      // window.alert(event.target.files[0]);
      this.selectedFile = new ImageSnippet(event.target.result, file);
      this.url = this.selectedFile.src;
    });

    reader.readAsDataURL(file);
  }

  upload(event, imageInput: any) {
    this.eventUpload = event;
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      // window.alert(event.target.files[0]);
      this.selectedFile = new ImageSnippet(event.target.result, file);
      this.url = this.selectedFile.src;
    });

    reader.readAsDataURL(file);
    // const id = this.cameraID + '_camera';
    // this.idImage = id;
    // this.ref = this.afStorage.ref('/camera/' + id);
    // this.task = this.ref.put(event.target.files[0]);
    // this.uploadProgress = this.task.percentageChanges();
    // console.log('Image uploaded!');
    // this.task.snapshotChanges().pipe(
    //   finalize(() => {
    //     this.downloadURL = this.ref.getDownloadURL();
    //     console.log(this.downloadURL);
    //     this.downloadURL.subscribe(url => (this.url = url));
    //   })
    // )
    //   .subscribe();
  }

  uploadFile(event) {
    console.log(event);
    window.alert(event.value);
  }


  valueIsChecked(): boolean {
    if (this.cameraDetailForm.valid) {
      if (!this.cameraDetailForm.get('cameraName').value.valid) {
        this.cameraDetail.name = this.cameraDetailForm.get('cameraName').value;
      }
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
      this.cameraDetail.imageUrl = '/camera/' + this.cameraDetail.id + '_camera';
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
