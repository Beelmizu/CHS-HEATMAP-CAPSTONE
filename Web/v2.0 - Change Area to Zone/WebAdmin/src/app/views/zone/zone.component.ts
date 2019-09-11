import { Component, OnInit } from '@angular/core';
import { Zone } from '../../models/zone.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ZoneService } from '../../services/zone.service';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-zone',
  templateUrl: './zone.component.html',
  styleUrls: ['./zone.component.scss']
})
export class ZoneComponent implements OnInit {

  zones: Zone[];
  zoneForm: FormGroup;
  storeID: number;

  constructor(
    private router: Router,
    private zoneService: ZoneService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private location: Location,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    const self = this;

    this.zoneForm = this.fb.group({
      'searchValue': ''
    });

    this.route.params.subscribe(params => {
      this.storeID = params.idStore;
      if (self.storeID != null) {
        this.getZoneInStore(this.storeID);
      }
    });
  }

  getZoneInStore(storeID): void {
    const self = this;
    this.zoneService.getAllZoneInStore(storeID).subscribe((zoneList) => {
      this.zones = zoneList;
    }, (error) => {
      console.log(error);
    });
  }


  searchZoneByValue(searchValue: String): void {
    const self = this;
    if (searchValue === '') {
      this.getZoneInStore(this.storeID);
    } else {
      this.zoneService.getZoneByValue(searchValue, this.storeID).subscribe((zoneList) => {
        if (zoneList.length === 0) {
          this.toastr.warning('Cannot find zone by value!', 'Warning');
        } else {
          this.zones = zoneList;
        }
      }, (error) => {
        console.log(error);
      });
    }
  }
}
