import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CameraService } from '../../services/camera.service';
import { Camera } from '../../models/camera.model';
import { AreaService } from '../../services/area.service';
import { Area } from '../../models/area.model';
import { StoreService } from '../../services/store.service';
import { Store } from '../../models/store.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-statistic-dialog',
  templateUrl: './statistic-dialog.component.html',
  styleUrls: ['./statistic-dialog.component.scss']
})
export class StatisticDialogComponent implements OnInit {


  form: FormGroup;
  title: any;
  listCamera: Camera[];
  listArea: Area[];
  listStore: Store[];
  accountID: number;
  selectedValueDate: any;
  data =
    {
      'value': 'null',
      'date': 'null',
    };

  constructor(
    private fb: FormBuilder,
    private cameraService: CameraService,
    private storeService: StoreService,
    private areaService: AreaService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<StatisticDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.accountID = data.id;
    this.title = data.title;
  }

  ngOnInit() {

    this.form = this.fb.group({
      'value': ['']
    });

    if (this.title === 'camera') {
      this.getAllCameraOfAccount();
    } if (this.title === 'area') {
      this.getAllAreaOfAccount();
    } if (this.title === 'store') {
      this.getAllStoreOfAccount();
    }
  }

  showStatistic() {
    this.data.value = this.form.get('value').value;
    if (this.form.get('value').value !== '' && this.selectedValueDate !== undefined) {
      this.dialogRef.close(this.data);
    } else {
      this.toastr.warning('Please choose all values in dialog !', 'Warning');
    }
  }

  close() {
    this.dialogRef.close();
  }

  getAllCameraOfAccount() {
    const self = this;
    this.cameraService.getAllCameraOfAccount(this.accountID).subscribe((cameras) => {
      this.listCamera = cameras;
    }, (error) => {
      console.log(error);
    });
  }

  getAllAreaOfAccount() {
    const self = this;
    this.areaService.getAllAreaOfAccount(this.accountID).subscribe((areas) => {
      this.listArea = areas;
    }, (error) => {
      console.log(error);
    });
  }

  getAllStoreOfAccount() {
    const self = this;
    this.storeService.getAllStoreByAccountID(this.accountID).subscribe((stores) => {
      this.listStore = stores;
    }, (error) => {
      console.log(error);
    });
  }

  catchDate(event) {
    this.data.date = event.format('YYYY-MM-DD');
    this.selectedValueDate = event.format('YYYY-MM-DD');
  }
}
