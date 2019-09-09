import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StoreService } from '../../services/store.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { Store } from '../../models/store.model';
import { AccountDetailService } from '../../services/account-detail.service';
import { ToastrService } from 'ngx-toastr';
import { StoreDetailService } from '../../services/store-detail.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {

  stores: Store[];
  storeForm: FormGroup;
  companyID: number;
  accountID: number;

  constructor(
    private router: Router,
    private storeService: StoreService,
    private accountDetailService: AccountDetailService,
    private storeDetailService: StoreDetailService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private location: Location,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    const self = this;

    this.storeForm = this.fb.group({
      'searchValue': ''
    });

    this.route.params.subscribe(params => {
      this.accountID = params.idAccount;
      if (self.accountID != null) {
        this.getStoreByAccountWithoutStatus(this.accountID);
      } else {
        this.companyID = params.idCompany;
        this.getStoreInCompany(this.companyID);
      }
    });
  }

  getStoreInCompany(companyID): void {
    const self = this;
    this.storeService.getAllStoreInCompany(companyID).subscribe((storeList) => {
      this.stores = storeList;
    }, (error) => {
      console.log(error);
    });
  }

  getStoreByAccountWithoutStatus(accountID): void {
    const self = this;
    this.storeService.getAllStoreByAccountWithoutStatus(accountID).subscribe((storeList) => {
      this.stores = storeList;
    }, (error) => {
      console.log(error);
    });
  }


  searchStoreByName(searchValue: String): void {
    const self = this;
    if (this.accountID == null) {
      if (searchValue === '') {
        this.getStoreInCompany(this.companyID);
      } else {
        this.storeService.getStoreInCompanyByValue(searchValue, this.companyID).subscribe((storeList) => {
          if (storeList.length === 0) {
            this.toastr.warning('Cannot find store by value!', 'Warning');
          } else {
            this.stores = storeList;
          }
        }, (error) => {
          console.log(error);
        });
      }
    } else {
      if (searchValue === '') {
        this.getStoreByAccountWithoutStatus(this.accountID);
      } else {
        this.storeService.getStoreOfAccountByValue(searchValue, this.accountID).subscribe((storeList) => {
          if (storeList.length === 0) {
            this.toastr.warning('Cannot find store by value!', 'Warning');
          } else {
            this.stores = storeList;
          }
        }, (error) => {
          console.log(error);
        });
      }
    }
  }

  deleteStoreOfAccount(storeID: number, name: String) {
    const self = this;
    if (window.confirm('Do you want to delete store ' + name + ' of this account ?')) {
      this.storeDetailService.deleteStoreOfAccount(this.accountID, storeID).subscribe((message) => {
        this.toastr.success('Delete ' + name + ' of this account successfully !', 'Success');
        window.location.reload();
      }, (error) => {
        this.toastr.warning('Delete ' + name + ' of this account unsuccessfully !', 'Warning');
      });
    } else { return; }
  }
}
