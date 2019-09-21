import { Component, OnInit } from '@angular/core';
import { Zone } from '../../models/zone.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ZoneService } from '../../services/zone.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { StoreService } from '../../services/store.service';
import { Store } from '../../models/store.model';

@Component({
  selector: 'app-zone',
  templateUrl: './zone.component.html',
  styleUrls: ['./zone.component.scss']
})
export class ZoneComponent implements OnInit {

  zones: Zone[];
  stoID: number;
  storeInfo: Store;
  showInfo = false;

  constructor(
    private router: Router,
    private zoneService: ZoneService,
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
        self.getZoneInStore(this.stoID);
      }
    });
  }

  getZoneInStore(storeID): void {
    const self = this;
    this.zoneService.getAllZoneInStore(storeID).subscribe((zoneList) => {
      self.zones = zoneList;
    }, (error) => {
      console.log(error);
    });
  }
}
