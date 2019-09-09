import { Component, OnInit } from '@angular/core';
import { Area } from '../../models/area.model';
import { Router, ActivatedRoute } from '@angular/router';
import { AreaService } from '../../services/area.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { StoreService } from '../../services/store.service';
import { Store } from '../../models/store.model';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})
export class AreaComponent implements OnInit {

  areas: Area[];
  stoID: number;
  storeInfo: Store;
  showInfo = false;

  constructor(
    private router: Router,
    private areaService: AreaService,
    private storeService: StoreService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    const self = this;

    self.route.params.subscribe(params => {
      self.stoID = params.storeID;
      if (self.stoID != null) {
        // self.getInfoStore(this.stoID);
        self.getAreaInStore(this.stoID);
      }
    });
  }

  getAreaInStore(storeID): void {
    const self = this;
    this.areaService.getAllAreaInStore(storeID).subscribe((areaList) => {
      self.areas = areaList;
    }, (error) => {
      console.log(error);
    });
  }
}
