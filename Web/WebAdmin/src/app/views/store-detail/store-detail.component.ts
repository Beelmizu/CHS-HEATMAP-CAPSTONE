import { Component, OnInit } from '@angular/core';
import { Store } from '../../models/store.model';
import { Router, ActivatedRoute } from '@angular/router';
import { StoreService } from '../../services/store.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Company } from '../../models/company.model';
import { StoreDetailService } from '../../services/store-detail.service';
import { CompanyService } from '../../services/company.service';
import { AccountService } from '../../services/account.service';
import { Account } from '../../models/account.model';

@Component({
  selector: 'app-store-detail',
  templateUrl: './store-detail.component.html',
  styleUrls: ['./store-detail.component.scss']
})
export class StoreDetailComponent implements OnInit {

  storeDetail = new Store;
  storeID: number;
  accountID: number;
  accounts: Account[];
  storeDetailForm: FormGroup;

  mode: String;

  constructor(
    private router: Router,
    private storeDetailService: StoreDetailService,
    private accountService: AccountService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {

    const self = this;

    this.getAllAccount();

    this.route.params.subscribe(params => {
      this.mode = params.mode;
      this.storeID = params.idStore;
      if (params.idAccount != null) {
        this.accountID = params.idAccount;
      } else {
        this.accountID = 0;
      }
    });
    if (this.storeID != null) {
      // Get store detail for view detail
      this.getStoreByID(this.storeID);
    }

    this.storeDetailForm = this.fb.group({
      'storeID':  [''],
      'storeName':  ['', [Validators.required, Validators.maxLength(45)]],
      'storeAddress':   ['', [Validators.required, Validators.maxLength(45)]],
      'storePhone':   ['', [Validators.required, Validators.maxLength(12)]],
      'storeCreatedDate':  [''],
      'storeUpdatedDate':  [''],
      'storeStatus':   [''],
      'storeUpdatedBy':   [''],
      'storeAccount':   [this.accountID]
    });



  }

  // Get all account
  getAllAccount() {
    const self = this;
    this.accountService.getAllAccount().subscribe((accountList) => {
      this.accounts = accountList;
    }, (error) => {
      console.log(error);
    });
  }

  // Get detail by ID
  getStoreByID(storeID): void {
    const self = this;
    this.storeDetailService.getStoreByID(storeID).subscribe((store) => {
      this.storeDetail = store;
      this.storeDetailForm.setValue({
        'storeID':  this.storeDetail.id,
        'storeName': this.storeDetail.name,
        'storeAddress':  this.storeDetail.address,
        'storePhone':  this.storeDetail.phone,
        'storeCreatedDate': this.storeDetail.createDate,
        'storeUpdatedDate': this.storeDetail.updateDate,
        'storeStatus':  this.storeDetail.status,
        'storeUpdatedBy':  this.storeDetail.updatedBy,
        'storeAccount': this.accountID
      });
    }, (error) => {
      console.log(error);
    });
  }

  inactiveStoreByID(): void {
    const self = this;
    if (window.confirm('Do you want to inactive ?')) {
        this.storeDetailService.inactiveStoreByID(this.storeDetail).subscribe((message) => {
          if (message) {
            window.alert('Inactive ' + this.storeDetail.name + ' successfully !');
            this.location.back();
          } else {
            window.alert('Inactive ' + this.storeDetail.name + ' unsuccessfully !');
          }
      }, (error) => {
        console.log(error);
      });
      window.alert('Inactive ' + this.storeDetail.name + ' successfully !');
      this.location.back();
    } else {
      return;
    }
  }

  activeStoreByID(): void {
    const self = this;
    if (window.confirm('Do you want to active ?')) {
        this.storeDetailService.activeStoreByID(this.storeDetail).subscribe((message) => {
          if (message) {
            window.alert('Active ' + this.storeDetail.name + ' successfully !');
            this.location.back();
          } else {
            window.alert('Active ' + this.storeDetail.name + ' unsuccessfully !');
          }
      }, (error) => {
        console.log(error);
      });
    } else {
      return;
    }
  }

  updateStoreByID(): void {
    const self = this;
    if (this.valueIsChecked()) {
      this.storeDetailService.updateStoreByID(this.storeDetail).subscribe((message) => {
        if (message) {
          window.alert('Update ' + this.storeDetail.name + ' successfully !');
          this.location.back();
        } else {
          window.alert('Update ' + this.storeDetail.name + ' unsuccessfully !');
        }
      }, (error) => {
          console.log(error);
      });
    } else {
      window.alert('Form is not valid !');
    }
  }

  addStore() {
    const self = this;
      if (this.valueIsChecked()) {
        this.storeDetailService.addNewStore(this.storeDetail).subscribe((message) => {
          if (message) {
            window.alert('Add ' + this.storeDetail.name + ' successfully !');
            this.location.back();
          } else {
            window.alert('Add ' + this.storeDetail.name + ' unsuccessfully !');
          }
        }, (error) => {
            console.log(error);
        });
      } else {
        window.alert('Form is not valid !');
      }
  }

  valueIsChecked(): boolean {
    if (this.storeDetailForm.valid) {
      if (!this.storeDetailForm.get('storeName').value.valid) {
        this.storeDetail.name = this.storeDetailForm.get('storeName').value;
      }
      if (!this.storeDetailForm.get('storeAddress').value.valid) {
        this.storeDetail.address = this.storeDetailForm.get('storeAddress').value;
      }
      if (!this.storeDetailForm.get('storePhone').value.valid) {
        this.storeDetail.phone = this.storeDetailForm.get('storePhone').value;
      }
      if (this.mode === 'detail') {
        this.storeDetail.updatedBy = localStorage.getItem('accountUsername');
      }
      if (this.storeDetailForm.get('storeAccount').value !== true) {
        this.storeDetail.cpn_store_id = this.storeDetailForm.get('storeAccount').value;
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
    return this.storeDetailForm.get(fieldName).invalid
    && (this.storeDetailForm.get(fieldName).dirty || this.storeDetailForm.get(fieldName).touched) && this.storeDetailForm.get(fieldName);
  }

  // ---- Check validate when user input (Invalid)
  isValid(fieldName: string) {
    return this.storeDetailForm.get(fieldName).valid;
  }

  goBack() {
    this.location.back();
  }
}
