import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StoreService } from '../../services/store.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { Store } from '../../models/store.model';

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
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private location: Location
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
        this.companyID =  params.idCompany;
        this.getStoreInCompany( this.companyID );
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
    if (searchValue === '') {
      this.getStoreInCompany(this.companyID);
    } else {
      this.storeService.getStoreByValue(searchValue).subscribe((storeList) => {
        this.stores = storeList;
      }, (error) => {
        console.log(error);
      });
    }
  }

}
