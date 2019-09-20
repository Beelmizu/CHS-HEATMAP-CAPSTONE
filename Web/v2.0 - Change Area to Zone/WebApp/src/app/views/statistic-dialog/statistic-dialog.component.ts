import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CameraService } from '../../services/camera.service';
import { Camera } from '../../models/camera.model';
import { ZoneService } from '../../services/zone.service';
import { Zone } from '../../models/zone.model';
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
  listZone: Zone[];
  listStore: Store[];
  accountID: number;
  selectedValueDate: any;

  storeID: any;
  zoneID: any;
  cameraID: any;

  data =
    {
      'idStore': 'null',
      'idZone': 'null',
      'ipCamera': 'null',
      'date': 'null',
    };

  constructor(
    private fb: FormBuilder,
    private cameraService: CameraService,
    private storeService: StoreService,
    private zoneService: ZoneService,
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
      'valueZone': [''],
      'valueCamera': ['']
    });
  }

  showStatistic() {
    if (this.title === 'camera') {
      // tslint:disable-next-line: max-line-length
      if ((this.form.get('valueStore').value !== '' && this.form.get('valueZone').value !== '' && this.form.get('valueCamera').value !== '') && this.selectedValueDate !== undefined) {
        this.data.idStore = this.form.get('valueStore').value;
        this.data.idZone = this.form.get('valueZone').value;
        this.data.ipCamera = this.form.get('valueCamera').value;
        this.dialogRef.close(this.data);
      } else {
        this.toastr.warning('Please choose all values in dialog !', 'Warning');
      }
    }
    if (this.title === 'zone') {
      // tslint:disable-next-line: max-line-length
      if ((this.form.get('valueStore').value !== '' && this.form.get('valueZone').value !== '') && this.selectedValueDate !== undefined) {
        this.data.idStore = this.form.get('valueStore').value;
        this.data.idZone = this.form.get('valueZone').value;
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
        this.data.idZone = '';
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

  getAllZoneOfAccount() {
    const self = this;
    this.zoneService.getAllZoneOfAccount(this.accountID).subscribe((zones) => {
      this.listZone = zones;
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
        'valueZone': '',
        'valueCamera': ''
      });
      this.listZone = [];
      this.listCamera = [];
      this.zoneService.getAllZoneInStore(this.storeID).subscribe((zones) => {
        this.listZone = zones;
      }, (error) => {
        console.log(error);
      });
    }
  }

  chooseZone() {
    this.zoneID = this.form.get('valueZone').value;
    if (this.title !== 'zone' || this.title !== 'store') {
      this.form.setValue({
        'valueStore': this.form.get('valueStore').value,
        'valueZone': this.form.get('valueZone').value,
        'valueCamera': ''
      });
      this.listCamera = [];
      this.cameraService.getAllCameraInZone(this.zoneID).subscribe((cameras) => {
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
