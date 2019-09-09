import { Component, OnInit } from '@angular/core';
import { Area } from '../../models/area.model';
import { Store } from '../../models/store.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { StoreService } from '../../services/store.service';
import { AreaDetailService } from '../../services/area-detail.service';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-area-detail',
  templateUrl: './area-detail.component.html',
  styleUrls: ['./area-detail.component.scss']
})
export class AreaDetailComponent implements OnInit {

  areaDetail = new Area;
  areaID: number;
  storeID: number;
  stores: Store[];
  areaDetailForm: FormGroup;

  mode: String;

  constructor(
    private router: Router,
    private areaDetailService: AreaDetailService,
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
      this.areaID = params.idArea;
    });

    this.areaDetailForm = this.fb.group({
      'areaID': [''],
      'areaFloor': ['', [Validators.required]],
      'areaName': ['', [Validators.required, Validators.maxLength(45)]],
      'areaCreatedDate': [''],
      'areaUpdatedDate': [''],
      'areaStatus': [''],
      'areaUpdatedBy': [''],
      'areaStore': [this.storeID]
    });

    if (this.areaID != null) {
      // Get area detail for view detail
      this.getAreaByID(this.areaID);
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
  getAreaByID(areaID): void {
    const self = this;
    this.areaDetailService.getAreaByID(areaID).subscribe((area) => {
      this.areaDetail = area;
      this.areaDetailForm.setValue({
        'areaID': this.areaDetail.id,
        'areaFloor': this.areaDetail.floor,
        'areaName': this.areaDetail.name,
        'areaCreatedDate': this.areaDetail.createdDate,
        'areaUpdatedDate': this.areaDetail.updatedDate,
        'areaStatus': this.areaDetail.status,
        'areaUpdatedBy': this.areaDetail.updatedBy,
        'areaStore': this.areaDetail.stoID
      });
    }, (error) => {
      console.log(error);
    });
  }

  inactiveAreaByID(): void {
    const self = this;
    if (window.confirm('Do you want to inactive ?')) {
      this.areaDetail.updatedBy = localStorage.getItem('accountUsername');
      this.areaDetailService.inactiveAreaByID(this.areaDetail).subscribe((message) => {
        if (message) {
          this.toastr.success('Inactive ' + this.areaDetail.name + ' successfully !', 'Success');
          this.location.back();
        } else {
          this.toastr.error('Inactive ' + this.areaDetail.name + ' unsuccessfully !', 'Error');
        }
      }, (error) => {
        console.log(error);
      });
    } else {
      return;
    }
  }

  activeAreaByID(): void {
    const self = this;
    if (window.confirm('Do you want to active ?')) {
      this.areaDetail.updatedBy = localStorage.getItem('accountUsername');
      this.areaDetailService.activeAreaByID(this.areaDetail).subscribe((message) => {
        if (message) {
          this.toastr.success('Active ' + this.areaDetail.name + ' successfully !', 'Success');
          this.location.back();
        } else {
          this.toastr.error('Active ' + this.areaDetail.name + ' unsuccessfully !', 'Error');
        }
      }, (error) => {
        console.log(error);
      });
    } else {
      return;
    }
  }

  updateAreaByID(): void {
    const self = this;
    if (this.valueIsChecked()) {
      this.areaDetailService.updateAreaByID(this.areaDetail).subscribe((message) => {
        if (message) {
          this.toastr.success('Update ' + this.areaDetail.name + ' successfully !', 'Success');
          this.location.back();
        } else {
          this.toastr.error('Update ' + this.areaDetail.name + ' unsuccessfully !', 'Error');
        }
      }, (error) => {
        console.log(error);
      });
    } else {
      this.toastr.warning('Form is not valid', 'Warning');
    }
  }

  addArea() {
    const self = this;
    if (this.valueIsChecked()) {
      this.areaDetailService.addNewArea(this.areaDetail).subscribe((message) => {
        if (message) {
          this.toastr.success('Create ' + this.areaDetail.name + ' successfully !', 'Success');
          this.location.back();
        } else {
          this.toastr.error('Create ' + this.areaDetail.name + ' unsuccessfully !', 'Error');
        }
      }, (error) => {
        console.log(error);
      });
    } else {
      this.toastr.warning('Form is not valid', 'Warning');
    }
  }

  valueIsChecked(): boolean {
    if (this.areaDetailForm.valid) {
      if (!this.areaDetailForm.get('areaFloor').value.valid) {
        this.areaDetail.floor = this.areaDetailForm.get('areaFloor').value;
      }
      if (!this.areaDetailForm.get('areaName').value.valid) {
        this.areaDetail.name = this.areaDetailForm.get('areaName').value;
      }
      if (this.mode === 'detail') {
        this.areaDetail.updatedBy = localStorage.getItem('accountUsername');
      }
      if (this.areaDetailForm.get('areaStore').value !== true) {
        this.areaDetail.stoID = this.areaDetailForm.get('areaStore').value;
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
    return this.areaDetailForm.get(fieldName).invalid
      && (this.areaDetailForm.get(fieldName).dirty || this.areaDetailForm.get(fieldName).touched) && this.areaDetailForm.get(fieldName);
  }

  // ---- Check validate when user input (Invalid)
  isValid(fieldName: string) {
    return this.areaDetailForm.get(fieldName).valid;
  }

  goBack() {
    this.location.back();
  }

}
