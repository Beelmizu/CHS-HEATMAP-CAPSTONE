import { Component, OnInit } from '@angular/core';
import { Area } from '../../models/area.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AreaService } from '../../services/area.service';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})
export class AreaComponent implements OnInit {

  areas: Area[];
  areaForm: FormGroup;
  storeID: number;

  constructor(
    private router: Router,
    private areaService: AreaService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private location: Location,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    const self = this;

    this.areaForm = this.fb.group({
      'searchValue': ''
    });

    this.route.params.subscribe(params => {
      this.storeID = params.idStore;
      if (self.storeID != null) {
        this.getAreaInStore(this.storeID);
      }
    });
  }

  getAreaInStore(storeID): void {
    const self = this;
    this.areaService.getAllAreaInStore(storeID).subscribe((areaList) => {
      this.areas = areaList;
    }, (error) => {
      console.log(error);
    });
  }


  searchAreaByValue(searchValue: String): void {
    const self = this;
    if (searchValue === '') {
      this.getAreaInStore(this.storeID);
    } else {
      this.areaService.getAreaByValue(searchValue, this.storeID).subscribe((areaList) => {
        if (areaList.length === 0) {
          this.toastr.warning('Cannot find area by value!', 'Warning');
        } else {
          this.areas = areaList;
        }
      }, (error) => {
        console.log(error);
      });
    }
  }
}
