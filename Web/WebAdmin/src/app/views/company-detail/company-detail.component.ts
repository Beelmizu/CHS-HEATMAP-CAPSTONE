import { Component, OnInit } from '@angular/core';
import { Company } from '../../models/company.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyDetailService } from '../../services/company-detail.service';
import { Location } from '@angular/common';
import { DateFormatter } from 'ngx-bootstrap';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.scss']
})
export class CompanyDetailComponent implements OnInit {

  companyDetail = new Company;
  companyDetailForm: FormGroup;
  companyID: number;

  mode: String;

  constructor(
    private router: Router,
    private companyDetailService: CompanyDetailService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {

    const self = this;

    this.companyDetailForm = self.fb.group({
      'companyID': [''],
      'companyName': ['', [Validators.required, Validators.maxLength(45)]],
      'companyAddress': ['', [Validators.required, Validators.maxLength(45)]],
      'companyCreatedDate': [''],
      'companyUpdatedDate': [''],
      'companyStatus': [''],
      'companyUpdatedBy': []
    });

    this.route.params.subscribe(params => {
      this.mode = params.mode;
      this.companyID = params.idCompany;
      if (this.companyID != null) {
        this.getCompanyByID(this.companyID);
      }
    });

  }

  // Get detail by ID
  getCompanyByID(companyID): void {
    const self = this;
    this.companyDetailService.getCompanyByID(companyID).subscribe((company) => {
      this.companyDetail = company;
      this.companyDetailForm.setValue({
        'companyID': this.companyDetail.id,
        'companyName': this.companyDetail.name,
        'companyAddress': this.companyDetail.address,
        'companyCreatedDate': this.companyDetail.createDate,
        'companyUpdatedDate': this.companyDetail.updateDate,
        'companyStatus': this.companyDetail.status,
        'companyUpdatedBy': this.companyDetail.updatedBy
      });
    }, (error) => {
      console.log(error);
    });
  }

  inactiveCompany(): void {
    const self = this;
    if (window.confirm('Do you want to inactive ?')) {
      this.companyDetailService.inactiveCompanyByID(this.companyDetail).subscribe((message) => {
        if (message) {
          window.alert('Inactive ' + this.companyDetail.name + ' successfully !');
          this.location.back();
        } else {
          window.alert('Inactive ' + this.companyDetail.name + ' unsuccessfully !');
        }
      }, (error) => {
        console.log(error);
      });
    } else {
      return;
    }
  }

  activeCompany(): void {
    const self = this;
    if (window.confirm('Do you want to active ?')) {
      this.companyDetailService.activeCompanyByID(this.companyDetail).subscribe((message) => {
        if (message) {
          window.alert('Active ' + this.companyDetail.name + ' successfully !');
          this.location.back();
        } else {
          window.alert('Active ' + this.companyDetail.name + ' unsuccessfully !');
        }
      }, (error) => {
        console.log(error);
      });
    } else {
      return;
    }
  }

  updateCompanyByID(): void {
    const self = this;
    if (this.valueIsChecked()) {
      this.companyDetailService.updateCompanyByID(this.companyDetail).subscribe((message) => {
        if (message) {
          window.alert('Update ' + this.companyDetail.name + ' successfully !');
          this.location.back();
        } else {
          window.alert('Update ' + this.companyDetail.name + ' unsuccessfully !');
        }
      }, (error) => {
        console.log(error);
      });
    } else {
      window.alert('Form is not valid !');
    }
  }

  addCompany() {
    const self = this;
    if (this.valueIsChecked()) {
      this.companyDetailService.addNewCompany(this.companyDetail).subscribe((message) => {
        if (message) {
          window.alert('Create' + this.companyDetail.name + ' successfully !');
          this.location.back();
        } else {
          window.alert('The ' + this.companyDetail.name + '  is existed !');
        }
      }, (error) => {
        console.log(error);
      });
    } else {
      window.alert('Form is not valid !');
    }
  }

  // ---- check value valid before update
  valueIsChecked(): boolean {
    if (this.companyDetailForm.valid) {
      if (!this.companyDetailForm.get('companyName').value.valid) {
        this.companyDetail.name = this.companyDetailForm.get('companyName').value;
      }
      if (!this.companyDetailForm.get('companyAddress').value.valid) {
        this.companyDetail.address = this.companyDetailForm.get('companyAddress').value;
      }
      if (this.mode === 'detail') {
        this.companyDetail.updatedBy = localStorage.getItem('accountUsername');
      }
      return true;
    } else {
      return false;
    }
  }

  // ---- Check validate when user input (Invalid)
  /* tslint:disable:max-line-length */
  isInvalid(fieldName: string) {
    return this.companyDetailForm.get(fieldName).invalid
      && (this.companyDetailForm.get(fieldName).dirty || this.companyDetailForm.get(fieldName).touched) && this.companyDetailForm.get(fieldName);
  }

  // ---- Check validate when user input (Invalid)
  isValid(fieldName: string) {
    return this.companyDetailForm.get(fieldName).valid;
  }

  goBack() {
    this.location.back();
  }

}