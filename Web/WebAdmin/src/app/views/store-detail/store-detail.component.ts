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
import { CompanyDetailService } from '../../services/company-detail.service';
import { AccountDetailService } from '../../services/account-detail.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-store-detail',
  templateUrl: './store-detail.component.html',
  styleUrls: ['./store-detail.component.scss']
})
export class StoreDetailComponent implements OnInit {

  storeDetail = new Store;
  companyDetail = new Company;
  storeID: number;
  accountID: number;
  companyID: number;
  accounts: Account[];
  companies: Company[];
  stores: Store[];
  storeDetailForm: FormGroup;
  storeDetailToAddForm: FormGroup;

  mode: String;

  constructor(
    private router: Router,
    private storeDetailService: StoreDetailService,
    private accountService: AccountService,
    private storeService: StoreService,
    private accountDetailService: AccountDetailService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private location: Location,
    private companyService: CompanyService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {

    const self = this;

    this.getAllCompany();

    this.route.params.subscribe(params => {
      this.mode = params.mode;
      this.storeID = params.idStore;
      this.companyID = params.idCompany;
      this.getAllAccountInCompany();
      if (this.mode === 'addStoreToAccount') {
        this.accountID = params.idAccount;
        this.getAllStoreInCompanyNotBelongAccount();
        this.storeDetailToAddForm = this.fb.group({
          'storeID': [this.storeID],
          'storeName': [''],
          'storeAddress': [''],
          'storePhone': [''],
          'storeAccount': [this.accountID]
        });
      } else {
        this.storeDetailForm = this.fb.group({
          'storeID': [''],
          'storeName': ['', [Validators.required, Validators.maxLength(45)]],
          'storeAddress': ['', [Validators.required, Validators.maxLength(45)]],
          'storePhone': ['', [Validators.required, Validators.maxLength(11)]],
          'storeCreatedDate': [''],
          'storeUpdatedDate': [''],
          'storeStatus': [''],
          'storeUpdatedBy': [''],
          'storeCom': [this.companyID],
        });
      }
    });
    if (this.storeID != null) {
      // Get store detail for view detail
      this.getStoreByID(this.storeID);
    }

  }
  // Get all company
  getAllCompany() {
    const self = this;
    this.companyService.getAllCompanies().subscribe((companies) => {
      this.companies = companies;
    }, (error) => {
      console.log(error);
    });
  }

  // Get all Store in company
  getAllStoreInCompany() {
    const self = this;
    this.storeService.getAllStoreInCompany(this.companyID).subscribe((stores) => {
      this.stores = stores;
    }, (error) => {
      console.log(error);
    });
  }

  // Get all Store in company not belong to this account
  getAllStoreInCompanyNotBelongAccount() {
    const self = this;
    this.storeService.getAllStoreInCompanyNotBelongAccount(this.companyID, this.accountID).subscribe((stores) => {
      this.stores = stores;
    }, (error) => {
      console.log(error);
    });
  }

  // Get all account
  getAllAccountInCompany() {
    const self = this;
    this.accountService.getAccountByCompany(this.companyID).subscribe((accountList) => {
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
        'storeID': this.storeDetail.id,
        'storeName': this.storeDetail.name,
        'storeAddress': this.storeDetail.address,
        'storePhone': this.storeDetail.phone,
        'storeCreatedDate': this.storeDetail.createdDate,
        'storeUpdatedDate': this.storeDetail.updatedDate,
        'storeStatus': this.storeDetail.status,
        'storeUpdatedBy': this.storeDetail.updatedBy,
        'storeCom': this.storeDetail.cpn_store_id
      });
    }, (error) => {
      console.log(error);
    });
  }

  // Get detail by ID
  getStoreAfterClick(): void {
    const self = this;
    this.storeDetailService.getStoreByID(this.storeDetailToAddForm.get('storeName').value).subscribe((store) => {
      this.storeDetail = store;
      this.storeDetailToAddForm.setValue({
        'storeID': this.storeDetail.id,
        'storeName': this.storeDetail.id,
        'storeAddress': this.storeDetail.address,
        'storePhone': this.storeDetail.phone,
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
          this.toastr.success('Inactive ' + this.storeDetail.name + ' successfully !', 'Success');
          this.location.back();
        } else {
          this.toastr.error('Inactive ' + this.storeDetail.name + ' unsuccessfully !', 'Error');
        }
      }, (error) => {
        console.log(error);
      });
    } else {
      return;
    }
  }

  activeStoreByID(): void {
    const self = this;
    if (window.confirm('Do you want to active ?')) {
      this.storeDetailService.activeStoreByID(this.storeDetail).subscribe((message) => {
        if (message) {
          this.toastr.success('Active ' + this.storeDetail.name + ' successfully !', 'Success');
          this.location.back();
        } else {
          this.toastr.error('Active ' + this.storeDetail.name + ' unsuccessfully !', 'Error');
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
          this.toastr.success('Update ' + this.storeDetail.name + ' successfully !', 'Success');
          this.location.back();
        } else {
          this.toastr.error('Update ' + this.storeDetail.name + ' unsuccessfully !', 'Error');
        }
      }, (error) => {
        console.log(error);
      });
    } else {
      this.toastr.warning('Form is not valid', 'Warning');
    }
  }

  addStoreToCompany() {
    const self = this;
    if (this.valueIsChecked()) {
      this.storeDetailService.addNewStore(this.storeDetail).subscribe((message) => {
        if (message) {
          this.toastr.success('Add ' + this.storeDetail.name + ' successfully !', 'Success');
          this.location.back();
        } else {
          this.toastr.error('Add ' + this.storeDetail.name + ' unsuccessfully !', 'Error');
        }
      }, (error) => {
        console.log(error);
      });
    } else {
      this.toastr.warning('Form is not valid', 'Warning');
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
      this.storeDetail.cpn_store_id = this.storeDetailForm.get('storeCom').value;
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

  addStoreToAccount() {
    const self = this;
    if (this.storeDetailToAddForm.get('storeName').value !== '') {
      this.storeDetailService.addStoreToAccount(this.accountID, this.storeDetail.id).subscribe((message) => {
        if (message) {
          this.toastr.success('Add ' + this.storeDetail.name + ' to this store successfully !', 'Success');
          this.location.back();
        } else {
          this.toastr.error('Add ' + this.storeDetail.name + ' to this store unsuccessfully !', 'Error');
        }
      }, (error) => {
        console.log(error);
      });
    } else {
      this.toastr.warning('Please choose store !', 'Warning');
    }
  }
}
