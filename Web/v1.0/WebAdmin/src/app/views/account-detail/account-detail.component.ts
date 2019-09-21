import { Component, OnInit } from '@angular/core';
import { Account } from '../../models/account.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountDetailService } from '../../services/account-detail.service';
import { Location } from '@angular/common';
import { DateFormatter } from 'ngx-bootstrap';
import { Company } from '../../models/company.model';
import { CompanyService } from '../../services/company.service';
import { StoreService } from '../../services/store.service';
import { Store } from '../../models/store.model';
import { AccountService } from '../../services/account.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss']
})
export class AccountDetailComponent implements OnInit {


  accountDetail = new Account;

  companies: Company[];
  stores: Store[];
  accounts: Account[];

  accountDetailForm: FormGroup;
  accountDetailToAddForm: FormGroup;
  changePasswordForm: FormGroup;
  accountID: number;
  companyID: number;
  storeID: number;

  newPassword: String;

  mode: String;

  isCollapsed = false;
  isExisted = false;

  constructor(
    private router: Router,
    private accountDetailService: AccountDetailService,
    private accountService: AccountService,
    private companyService: CompanyService,
    private storeService: StoreService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private location: Location,
    private toastr: ToastrService

  ) { }

  ngOnInit() {

    const self = this;
    this.isCollapsed = true;

    this.getAllCompany();

    this.route.params.subscribe(params => {
      this.mode = params.mode;
      this.accountID = params.idAccount;
      this.companyID = params.idCompany;
      if (this.mode === 'addAccountStore') {
        this.storeID = params.idStore;
        this.getAllStoreInCompany();
        this.getAllAccountByCompanyNotBelongToThisStore();
        this.accountDetailToAddForm = this.fb.group({
          'accID': [''],
          'accUsername': [''],
          'accFullname': [''],
          'accEmail': [''],
          'accPhone': [''],
          'accGender': ['0'],
          'accStore': [this.storeID]
        });
      } else {
        this.accountDetailForm = this.fb.group({
          'accID': [''],
          'accUsername': ['', [Validators.required, Validators.maxLength(20)]],
          'accPassword': ['', [Validators.required, Validators.minLength(6)]],
          'accConfirmPassword': [''],
          'accFullname': ['', [Validators.required, Validators.maxLength(45)]],
          'accEmail': ['', [Validators.required, Validators.email]],
          'accPhone': ['', [Validators.required, Validators.maxLength(11)]],
          'accGender': ['0'],
          'accRole': ['true'],
          'accCreatedDate': [''],
          'accUpdatedDate': [''],
          'accStatus': [''],
          'accUpdatedBy': [''],
          'accCompany': [this.companyID]
        });

        this.changePasswordForm = this.fb.group({
          'accPasswordChange': ['', [Validators.required, Validators.minLength(6)]],
          'accPasswordChangeConfirm': ['']
        });
      }
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
      this.companies = companyList;
    }, (error) => {
      console.log(error);
    });
  }

  // Get all store of in company
  getAllStoreInCompany() {
    const self = this;
    this.storeService.getAllStoreInCompany(this.companyID).subscribe((stores) => {
      this.stores = stores;
    }, (error) => {
      console.log(error);
    });
  }

  getAllAccountByCompanyNotBelongToThisStore() {
    const self = this;
    this.accountService.getAllAccountByCompanyNotBelongToThisStore(this.companyID, this.storeID).subscribe((accounts) => {
      this.accounts = accounts;
    }, (error) => {
      console.log(error);
    });
  }

  // Get detail by ID
  getAccountDetailAfterChoose(): void {
    const self = this;
    this.accountDetailService.getAccountByID(this.accountDetailToAddForm.get('accUsername').value).subscribe((account) => {
      this.accountDetail = account;
      this.accountDetailToAddForm.setValue({
        'accID': this.accountDetail.id,
        'accUsername': this.accountDetail.id,
        'accFullname': this.accountDetail.fullName,
        'accEmail': this.accountDetail.email,
        'accPhone': this.accountDetail.phone,
        'accGender': String(this.accountDetail.gender),
        'accStore': this.storeID,
      });
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
        'accConfirmPassword': self.accountDetail.password,
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
          this.toastr.success('Inactive ' + this.accountDetail.username + ' successfully !', 'Success');
          this.location.back();
        } else {
          this.toastr.error('Inactive ' + this.accountDetail.username + ' unsuccessfully !', 'Error');
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
          this.toastr.success('Active ' + this.accountDetail.username + ' successfully !', 'Success');
          this.location.back();
        } else {
          this.toastr.error('Active ' + this.accountDetail.username + ' unsuccessfully !', 'Error');
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
          this.toastr.success('Update ' + this.accountDetail.username + ' successfully !', 'Success');
          this.location.back();
        } else {
          this.toastr.error('This username is not existed !', 'Error');
        }
      }, (error) => {
        console.log(error);
      });
    } else {
      this.toastr.warning('Form is not valid !', 'Warning');
    }
  }

  addAccount() {
    const self = this;
    if (this.valueIsChecked()) {
      this.accountDetailService.addNewAccount(this.accountDetail).subscribe((message) => {
        if (message) {
          this.toastr.success('Create ' + this.accountDetail.username + ' successfully !', 'Success');
          this.location.back();
        } else {
          this.toastr.error(' This username is existed !', 'Error');
          this.isExisted = true;
        }
      }, (error) => {
        console.log(error);
      });
    } else {
      this.toastr.warning('Form is not valid !', 'Warning');
    }
  }

  addAccountToStore() {
    const self = this;
    if (this.accountDetailToAddForm.get('accUsername').value !== '') {
      this.accountDetailService.addAccountToStore(this.accountDetail.id, this.storeID).subscribe((message) => {
        if (message) {
          this.toastr.success('Add ' + this.accountDetail.username + ' to this store successfully !', 'Success');
          this.location.back();
        } else {
          this.toastr.error('Add ' + this.accountDetail.username + ' to this store unsuccessfully !', 'Error');
        }
      }, (error) => {
        console.log(error);
      });
    } else {
      this.toastr.warning('Please choose account', 'Warning');
    }
  }

  // ---- check value valid before update
  valueIsChecked(): boolean {
    if (this.accountDetailForm.valid) {
      if (!this.accountDetailForm.get('accUsername').value.valid) {
        this.accountDetail.username = this.accountDetailForm.get('accUsername').value;
      }
      if (this.mode === 'add') {
        if (!this.accountDetailForm.get('accPassword').value.valid) {
          if (this.accountDetailForm.get('accConfirmPassword').getError('notMatch') == null) {
            this.accountDetail.password = this.accountDetailForm.get('accPassword').value;
          }
        }
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
      if (this.companyID === 7) {
        this.accountDetail.role = this.accountDetailForm.get('accRole').value;
      } else {
        this.accountDetail.role = false;
      }
      if (this.mode === 'detail') {
        this.accountDetail.updatedBy = localStorage.getItem('accountUsername');
      }
      if (this.accountDetailForm.get('accCompany').value !== true) {
        this.accountDetail.cpn_acc_id = this.accountDetailForm.get('accCompany').value;
      }
      return true;
    } else {
      return false;
    }
  }

  valueIsCheckedChangePassword(): boolean {
    if (this.changePasswordForm.valid) {
      if (!this.changePasswordForm.get('accPasswordChange').value.valid) {
        if (this.changePasswordForm.get('accPasswordChangeConfirm').getError('notMatch') == null) {
          this.newPassword = this.changePasswordForm.get('accPasswordChange').value;
        }
      }
      return true;
    } else {
      return false;
    }
  }

  changePassword() {
    const self = this;
    if (this.valueIsCheckedChangePassword()) {
      if (window.confirm('Do you want to change password ?')) {
        // tslint:disable-next-line: max-line-length
        this.accountDetailService.changePasswordOfAccount(this.accountDetail.id + '', this.accountDetail.password, this.newPassword, localStorage.getItem('accountUsername')).subscribe((message) => {
          if (message) {
            this.toastr.success('Change password successfully !', 'Success');
            this.location.back();
          } else {
            this.toastr.error('Change password unsuccessfully !', 'Error');
          }
        }, (error) => {
          console.log(error);
        });
      } else {
        return;
      }
    } else {
      this.toastr.warning('Form is not valid !', 'Warning');
    }
  }

  checkConfirmPassword() {
    const pass = this.accountDetailForm.get('accPassword').value;
    const confirmPass = this.accountDetailForm.get('accConfirmPassword').value;

    if (pass !== confirmPass) {
      this.accountDetailForm.get('accConfirmPassword').setErrors({ notMatch: true });
    } else {
      this.accountDetailForm.get('accConfirmPassword').setErrors(null);
    }
  }

  checkConfirmPasswordForChangePasswordForm() {
    const pass = this.changePasswordForm.get('accPasswordChange').value;
    const confirmPass = this.changePasswordForm.get('accPasswordChangeConfirm').value;

    if (pass !== confirmPass) {
      this.changePasswordForm.get('accPasswordChangeConfirm').setErrors({ notMatch: true });
    } else {
      this.changePasswordForm.get('accPasswordChangeConfirm').setErrors(null);
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

  // ---- Check validate when user input (Invalid)
  /* tslint:disable:max-line-length */
  isInvalidChangePassword(fieldName: string) {
    return this.changePasswordForm.get(fieldName).invalid
      && (this.changePasswordForm.get(fieldName).dirty || this.changePasswordForm.get(fieldName).touched) && this.changePasswordForm.get(fieldName);
  }

  // ---- Check validate when user input (Invalid)
  isValidChangePassword(fieldName: string) {
    return this.changePasswordForm.get(fieldName).valid;
  }

  isNotMatch(fieldName: string) {
    this.checkConfirmPassword();
    return this.accountDetailForm.get(fieldName).getError('notMatch')
      && (this.accountDetailForm.get(fieldName).dirty || this.accountDetailForm.get(fieldName).touched) && this.accountDetailForm.get(fieldName);
  }

  isMatch(fieldName: string) {
    this.checkConfirmPassword();
    return this.accountDetailForm.get(fieldName).getError('notMatch') == null
      && this.accountDetailForm.get(fieldName).touched && this.accountDetailForm.get(fieldName).dirty;
  }

  isNotMatchChangePassword(fieldName: string) {
    this.checkConfirmPasswordForChangePasswordForm();
    return this.changePasswordForm.get(fieldName).getError('notMatch')
      && (this.changePasswordForm.get(fieldName).dirty || this.changePasswordForm.get(fieldName).touched) && this.changePasswordForm.get(fieldName);
  }

  isMatchChangePassword(fieldName: string) {
    this.checkConfirmPasswordForChangePasswordForm();
    return this.changePasswordForm.get(fieldName).getError('notMatch') == null
      && this.changePasswordForm.get(fieldName).touched && this.changePasswordForm.get(fieldName).dirty;
  }

  goBack() {
    this.location.back();
  }

}
