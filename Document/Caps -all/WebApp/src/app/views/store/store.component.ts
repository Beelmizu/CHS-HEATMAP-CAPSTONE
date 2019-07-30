import { Component, OnInit } from '@angular/core';
import { Store } from '../../models/store.model';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {

  stores: Store[];

  accountID: string;

  constructor(
    private storeService: StoreService
  ) { }

  ngOnInit() {
    const self = this;
    this.accountID  = localStorage.getItem('accountID');
    self.getStoreByAccountID(+this.accountID);
  }


  getStoreByAccountID(accountID): void {
    const self = this;
    this.storeService.getAllStoreByAccountID(accountID).subscribe((storeList) => {
      self.stores = storeList;
    }, (error) => {
      console.log(error);
    });
  }
}
