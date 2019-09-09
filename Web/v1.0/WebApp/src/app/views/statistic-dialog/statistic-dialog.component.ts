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

  storeID: any;
  areaID: any;
  cameraID: any;

  data =
    {
      'idStore': 'null',
      'idArea': 'null',
      'ipCamera': 'null',
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
    this.getAllStoreOfAccount();

    this.form = this.fb.group({
      'valueStore': [''],
      'valueArea': [''],
      'valueCamera': ['']
    });
  }

  showStatistic() {
    if (this.title === 'camera') {
      // tslint:disable-next-line: max-line-length
      if ((this.form.get('valueStore').value !== '' && this.form.get('valueArea').value !== '' && this.form.get('valueCamera').value !== '') && this.selectedValueDate !== undefined) {
        this.data.idStore = this.form.get('valueStore').value;
        this.data.idArea = this.form.get('valueArea').value;
        this.data.ipCamera = this.form.get('valueCamera').value;
        this.dialogRef.close(this.data);
      } else {
        this.toastr.warning('Please choose all values in dialog !', 'Warning');
      }
    }
    if (this.title === 'area') {
      // tslint:disable-next-line: max-line-length
      if ((this.form.get('valueStore').value !== '' && this.form.get('valueArea').value !== '') && this.selectedValueDate !== undefined) {
        this.data.idStore = this.form.get('valueStore').value;
        this.data.idArea = this.form.get('valueArea').value;
        this.data.ipCamera = '';
        this.dialogRef.close(this.data);
      } else {
        this.toastr.warning('Please choose all values in dialog !', 'Warning');
      }
    }
    if (this.title === 'store') {
      // tslint:disable-next-line: max-line-length
      if ((this.form.get('valueStore').value !== '') && this.selectedValueDate !== undefined) {
        this.data.idStore = this.form.get('valueStore').value;
        this.data.idArea = '';
        this.data.ipCamera = '';
        this.dialogRef.close(this.data);
      } else {
        this.toastr.warning('Please choose all values in dialog !', 'Warning');
      }
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

  chooseStore() {
    this.storeID = this.form.get('valueStore').value;
    if (this.title !== 'store') {
      this.form.setValue({
        'valueStore': this.form.get('valueStore').value,
        'valueArea': '',
        'valueCamera': ''
      });
      this.listArea = [];
      this.listCamera = [];
      this.areaService.getAllAreaInStore(this.storeID).subscribe((areas) => {
        this.listArea = areas;
      }, (error) => {
        console.log(error);
      });
    }
  }

  chooseArea() {
    this.areaID = this.form.get('valueArea').value;
    if (this.title !== 'area' || this.title !== 'store') {
      this.form.setValue({
        'valueStore': this.form.get('valueStore').value,
        'valueArea': this.form.get('valueArea').value,
        'valueCamera': ''
      });
      this.listCamera = [];
      this.cameraService.getAllCameraInArea(this.areaID).subscribe((cameras) => {
        this.listCamera = cameras;
      }, (error) => {
        console.log(error);
      });
    }
  }

  catchDate(event) {
    this.data.date = event.format('YYYY-MM-DD');
    this.selectedValueDate = event.format('YYYY-MM-DD');
  }
}
