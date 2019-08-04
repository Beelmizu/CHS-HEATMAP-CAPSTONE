import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountDetailService } from '../../services/account-detail.service';
import { Location } from '@angular/common';
import { Account } from '../../models/account.model';
import * as bcrypt from 'bcryptjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  changePasswordForm: FormGroup;
  accountID: string;
  accountDetail = new Account;
  oldPassword: String;
  newPassword: String;
  isNotCorrect = false;

  constructor(
    private router: Router,
    private accountDetailService: AccountDetailService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private location: Location,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    const self = this;

    this.accountID = localStorage.getItem('accountID');
    this.getAccountByID(+this.accountID);

    self.changePasswordForm = self.fb.group({
      'accOldPassword': ['', [Validators.required]],
      'accPassword': ['', [Validators.required, Validators.minLength(6)]],
      'accConfirmPassword': ['']
    });
  }

  getAccountByID(accountID): void {
    const self = this;
    this.accountDetailService.getAccountByID(accountID).subscribe((account) => {
      this.accountDetail = account;
    }, (error) => {
      console.log(error);
    });
  }

  valueIsChecked(): boolean {
    if (this.changePasswordForm.valid) {
      if (!this.changePasswordForm.get('accOldPassword').value.valid) {
        this.oldPassword = this.changePasswordForm.get('accOldPassword').value;
      }
      if (!this.changePasswordForm.get('accPassword').value.valid) {
        if (this.changePasswordForm.get('accConfirmPassword').getError('notMatch') == null) {
          this.newPassword = this.changePasswordForm.get('accPassword').value;
        }
      }
      return true;
    } else {
      return false;
    }
  }

  changePassword() {
    const self = this;
    if (this.valueIsChecked()) {
      if (window.confirm('Do you want to change password ?')) {
        // tslint:disable-next-line: max-line-length
        this.accountDetailService.changePassword(this.accountDetail.id + '', this.oldPassword, this.newPassword, localStorage.getItem('accountUsername')).subscribe((message) => {
          if (message) {
            this.toastr.success('Change password successfully !', 'Success');
            this.router.navigate(['/stores']);
          } else {
            this.isNotCorrect = true;
            this.toastr.error('The old password is not correct !', 'Error');
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

  // ---- Check validate when user input (Invalid)
  /* tslint:disable:max-line-length */
  isInvalid(fieldName: string) {
    return this.changePasswordForm.get(fieldName).invalid
      && (this.changePasswordForm.get(fieldName).dirty || this.changePasswordForm.get(fieldName).touched) && this.changePasswordForm.get(fieldName);
  }
  // ---- Check validate when user input (Invalid)
  isValid(fieldName: string) {
    return this.changePasswordForm.get(fieldName).valid;
  }

  isNotMatch(fieldName: string) {
    this.checkConfirmPassword();
    return this.changePasswordForm.get(fieldName).getError('notMatch')
      && (this.changePasswordForm.get(fieldName).dirty || this.changePasswordForm.get(fieldName).touched) && this.changePasswordForm.get(fieldName);
  }

  isMatch(fieldName: string) {
    this.checkConfirmPassword();
    return this.changePasswordForm.get(fieldName).getError('notMatch') == null
      && this.changePasswordForm.get(fieldName).touched && this.changePasswordForm.get(fieldName).dirty;
  }

  checkConfirmPassword() {
    const pass = this.changePasswordForm.get('accPassword').value;
    const confirmPass = this.changePasswordForm.get('accConfirmPassword').value;

    if (pass !== confirmPass) {
      this.changePasswordForm.get('accConfirmPassword').setErrors({ notMatch: true });
    } else {
      this.changePasswordForm.get('accConfirmPassword').setErrors(null);
    }
  }
}
