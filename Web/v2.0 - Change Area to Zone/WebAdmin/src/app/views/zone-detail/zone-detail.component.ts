import { Component, OnInit } from '@angular/core';
import { Zone } from '../../models/zone.model';
import { Store } from '../../models/store.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { StoreService } from '../../services/store.service';
import { ZoneDetailService } from '../../services/zone-detail.service';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-zone-detail',
  templateUrl: './zone-detail.component.html',
  styleUrls: ['./zone-detail.component.scss']
})
export class ZoneDetailComponent implements OnInit {

  zoneDetail = new Zone;
  zoneID: number;
  storeID: number;
  stores: Store[];
  zoneDetailForm: FormGroup;

  mode: String;

  constructor(
    private router: Router,
    private zoneDetailService: ZoneDetailService,
    private storeService: StoreService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private location: Location,
    private toastr: ToastrService
  ) { }

  ngOnInit() {

    const self = this;

    this.getAllStore();

    this.route.params.subscribe(params => {
      this.mode = params.mode;
      this.storeID = params.idStore;
      this.zoneID = params.idZone;
    });

    this.zoneDetailForm = this.fb.group({
      'zoneID': [''],
      'zoneFloor': ['', [Validators.required]],
      'zoneName': ['', [Validators.required, Validators.maxLength(45)]],
      'zoneCreatedDate': [''],
      'zoneUpdatedDate': [''],
      'zoneStatus': [''],
      'zoneUpdatedBy': [''],
      'zoneStore': [this.storeID]
    });

    if (this.zoneID != null) {
      // Get zone detail for view detail
      this.getZoneByID(this.zoneID);
    }
  }

  // Get all store
  getAllStore() {
    const self = this;
    this.storeService.getAllStore().subscribe((storeList) => {
      this.stores = storeList;
    }, (error) => {
      console.log(error);
    });
  }

  // Get detail by ID
  getZoneByID(zoneID): void {
    const self = this;
    this.zoneDetailService.getZoneByID(zoneID).subscribe((zone) => {
      this.zoneDetail = zone;
      this.zoneDetailForm.setValue({
        'zoneID': this.zoneDetail.id,
        'zoneFloor': this.zoneDetail.floor,
        'zoneName': this.zoneDetail.name,
        'zoneCreatedDate': this.zoneDetail.createdDate,
        'zoneUpdatedDate': this.zoneDetail.updatedDate,
        'zoneStatus': this.zoneDetail.status,
        'zoneUpdatedBy': this.zoneDetail.updatedBy,
        'zoneStore': this.zoneDetail.stoID
      });
    }, (error) => {
      console.log(error);
    });
  }

  inactiveZoneByID(): void {
    const self = this;
    if (window.confirm('Do you want to inactive ?')) {
      this.zoneDetail.updatedBy = localStorage.getItem('accountUsername');
      this.zoneDetailService.inactiveZoneByID(this.zoneDetail).subscribe((message) => {
        if (message) {
          this.toastr.success('Inactive ' + this.zoneDetail.name + ' successfully !', 'Success');
          this.location.back();
        } else {
          this.toastr.error('Inactive ' + this.zoneDetail.name + ' unsuccessfully !', 'Error');
        }
      }, (error) => {
        console.log(error);
      });
    } else {
      return;
    }
  }

  activeZoneByID(): void {
    const self = this;
    if (window.confirm('Do you want to active ?')) {
      this.zoneDetail.updatedBy = localStorage.getItem('accountUsername');
      this.zoneDetailService.activeZoneByID(this.zoneDetail).subscribe((message) => {
        if (message) {
          this.toastr.success('Active ' + this.zoneDetail.name + ' successfully !', 'Success');
          this.location.back();
        } else {
          this.toastr.error('Active ' + this.zoneDetail.name + ' unsuccessfully !', 'Error');
        }
      }, (error) => {
        console.log(error);
      });
    } else {
      return;
    }
  }

  updateZoneByID(): void {
    const self = this;
    if (this.valueIsChecked()) {
      this.zoneDetailService.updateZoneByID(this.zoneDetail).subscribe((message) => {
        if (message) {
          this.toastr.success('Update ' + this.zoneDetail.name + ' successfully !', 'Success');
          this.location.back();
        } else {
          this.toastr.error('Update ' + this.zoneDetail.name + ' unsuccessfully !', 'Error');
        }
      }, (error) => {
        console.log(error);
      });
    } else {
      this.toastr.warning('Form is not valid', 'Warning');
    }
  }

  addZone() {
    const self = this;
    if (this.valueIsChecked()) {
      this.zoneDetailService.addNewZone(this.zoneDetail).subscribe((message) => {
        if (message) {
          this.toastr.success('Create ' + this.zoneDetail.name + ' successfully !', 'Success');
          this.location.back();
        } else {
          this.toastr.error('Create ' + this.zoneDetail.name + ' unsuccessfully !', 'Error');
        }
      }, (error) => {
        console.log(error);
      });
    } else {
      this.toastr.warning('Form is not valid', 'Warning');
    }
  }

  valueIsChecked(): boolean {
    if (this.zoneDetailForm.valid) {
      if (!this.zoneDetailForm.get('zoneFloor').value.valid) {
        this.zoneDetail.floor = this.zoneDetailForm.get('zoneFloor').value;
      }
      if (!this.zoneDetailForm.get('zoneName').value.valid) {
        this.zoneDetail.name = this.zoneDetailForm.get('zoneName').value;
      }
      if (this.mode === 'detail') {
        this.zoneDetail.updatedBy = localStorage.getItem('accountUsername');
      }
      if (this.zoneDetailForm.get('zoneStore').value !== true) {
        this.zoneDetail.stoID = this.zoneDetailForm.get('zoneStore').value;
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
    return this.zoneDetailForm.get(fieldName).invalid
      && (this.zoneDetailForm.get(fieldName).dirty || this.zoneDetailForm.get(fieldName).touched) && this.zoneDetailForm.get(fieldName);
  }

  // ---- Check validate when user input (Invalid)
  isValid(fieldName: string) {
    return this.zoneDetailForm.get(fieldName).valid;
  }

  goBack() {
    this.location.back();
  }

}
