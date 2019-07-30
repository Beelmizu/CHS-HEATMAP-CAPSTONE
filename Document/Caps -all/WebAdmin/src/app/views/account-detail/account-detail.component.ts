import { Component, OnInit } from '@angular/core';
import { Account } from '../../models/account.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountDetailService } from '../../services/account-detail.service';
import { Location } from '@angular/common';
import { DateFormatter } from 'ngx-bootstrap';
import { Company } from '../../models/company.model';
import { CompanyService } from '../../services/company.service';


@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss']
})
export class AccountDetailComponent implements OnInit {


  accountDetail = new Account;
  companies: Company[];
  accountDetailForm: FormGroup;
  accountID: number;
  companyID: number;

  mode: String;

  constructor(
    private router: Router,
    private accountDetailService: AccountDetailService,
    private companyService: CompanyService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {

    const self = this;

    this.getAllCompany();

    this.route.params.subscribe(params => {
      this.mode = params.mode;
      this.accountID = params.idAccount;
      this.companyID = params.idCompany;
    });

    // Initialize the formControlName
    this.accountDetailForm = this.fb.group({
      'accID': [''],
      'accUsername': ['', [Validators.required, Validators.maxLength(20)]],
      'accPassword': ['', [Validators.required, Validators.maxLength(20)]],
      'accFullname': ['', [Validators.required, Validators.maxLength(45)]],
      'accEmail': ['', [Validators.required, Validators.email]],
      'accPhone': ['', [Validators.required, Validators.maxLength(10)]],
      'accGender': ['0'],
      'accRole': ['true'],
      'accCreatedDate': [''],
      'accUpdatedDate': [''],
      'accStatus': [''],
      'accUpdatedBy': [''],
      'accCompany': [this.companyID]
    });

    if (this.accountID != null) {
      // Get account detail for view detail
      this.getAccountByID(this.accountID);
    }

  }

  // Get all company
  getAllCompany() {
    const self = this;
    this.companyService.getAllCompanies().subscribe((companyList) => {
      self.companies = companyList;
    }, (error) => {
      console.log(error);
    });
  }


  // Get detail by ID
  getAccountByID(accountID): void {
    const self = this;
    this.accountDetailService.getAccountByID(accountID).subscribe((account) => {
      this.accountDetail = account;
      this.accountDetailForm.setValue({
        'accID': this.accountDetail.id,
        'accUsername': this.accountDetail.username,
        'accPassword': this.accountDetail.password,
        'accFullname': this.accountDetail.fullName,
        'accEmail': this.accountDetail.email,
        'accPhone': this.accountDetail.phone,
        'accGender': String(this.accountDetail.gender),
        'accRole': String(this.accountDetail.role),
        'accCreatedDate': this.accountDetail.createdDate,
        'accUpdatedDate': this.accountDetail.updatedDate,
        'accStatus': this.accountDetail.status,
        'accUpdatedBy': this.accountDetail.updatedBy,
        'accCompany': this.accountDetail.cpn_acc_id
      });
    }, (error) => {
      console.log(error);
    });
  }

  inactiveAccountByID(): void {
    const self = this;
    if (window.confirm('Do you want to inactive ?')) {
      this.accountDetailService.inactiveAccountByID(this.accountDetail).subscribe((message) => {
        if (message) {
          window.alert('Inactive ' + this.accountDetail.username + ' successfully !');
          this.location.back();
        } else {
          window.alert('Inactive ' + this.accountDetail.username + ' unsuccessfully !');
        }
      }, (error) => {
        console.log(error);
      });
    } else {
      return;
    }
  }

  activeAccountByID(): void {
    const self = this;
    if (window.confirm('Do you want to active ?')) {
      this.accountDetailService.activeAccountByID(this.accountDetail).subscribe((message) => {
        if (message) {
          window.alert('Active ' + this.accountDetail.username + ' successfully !');
          this.location.back();
        } else {
          window.alert('Active ' + this.accountDetail.username + ' unsuccessfully !');
        }
      }, (error) => {
        console.log(error);
      });
    } else {
      return;
    }
  }

  updateAccountByID(): void {
    const self = this;
    if (this.valueIsChecked()) {
      this.accountDetailService.updateAccountByID(this.accountDetail).subscribe((message) => {
        if (message) {
          window.alert('Update ' + this.accountDetail.username + ' successfully !');
          this.location.back();
        } else {
          window.alert('This username is not existed !');
        }
      }, (error) => {
        console.log(error);
      });
    } else {
      window.alert('Form is not valid !');
    }
  }

  addAccount() {
    const self = this;
    if (this.valueIsChecked()) {
      this.accountDetailService.addNewAccount(this.accountDetail).subscribe((message) => {
        if (message) {
          window.alert('Create ' + this.accountDetail.username + ' successfully !');
          this.location.back();
        } else {
          window.alert(' This username is existed !');
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
    if (this.accountDetailForm.valid) {
      if (!this.accountDetailForm.get('accUsername').value.valid) {
        this.accountDetail.username = this.accountDetailForm.get('accUsername').value;
      }
      if (!this.accountDetailForm.get('accPassword').value.valid) {
        this.accountDetail.password = this.accountDetailForm.get('accPassword').value;
      }
      if (!this.accountDetailForm.get('accFullname').value.valid) {
        this.accountDetail.fullName = this.accountDetailForm.get('accFullname').value;
      }
      if (!this.accountDetailForm.get('accEmail').value.valid) {
        this.accountDetail.email = this.accountDetailForm.get('accEmail').value;
      }
      if (!this.accountDetailForm.get('accPhone').value.valid) {
        this.accountDetail.phone = this.accountDetailForm.get('accPhone').value;
      }
      this.accountDetail.gender = this.accountDetailForm.get('accGender').value;
      this.accountDetail.role = this.accountDetailForm.get('accRole').value;
      if (this.mode === 'detail') {
        this.accountDetail.updatedBy = localStorage.getItem('accountUsername');
      }
      if (this.accountDetailForm.get('accCompany').value !== true) {
        this.accountDetail.cpn_acc_id = this.accountDetailForm.get('accCompany').value;
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
    return this.accountDetailForm.get(fieldName).invalid
      && (this.accountDetailForm.get(fieldName).dirty || this.accountDetailForm.get(fieldName).touched) && this.accountDetailForm.get(fieldName);
  }

  // ---- Check validate when user input (Invalid)
  isValid(fieldName: string) {
    return this.accountDetailForm.get(fieldName).valid;
  }


  goBack() {
    this.location.back();
  }

}
