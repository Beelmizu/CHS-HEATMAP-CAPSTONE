import { Component, OnInit } from '@angular/core';
import { Account } from '../../models/account.model';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountDetailService } from '../../services/account-detail.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  accountDetail = new Account;
  accountDetailForm: FormGroup;
  accountID: string;

  constructor(
    private router: Router,
    private accountDetailService: AccountDetailService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    const self = this;
    this.accountID  = localStorage.getItem('accountID');
    this.getAccountByID(+this.accountID);

    self.accountDetailForm = self.fb.group({
      'accUsername':  ['', [Validators.required, Validators.maxLength(20)]],
      'accPassword':   ['', [Validators.required, Validators.maxLength(20), Validators.minLength(6)]],
      'accConfirmPassword':   ['', Validators.required],
      'accFullname':   ['', [Validators.required, Validators.maxLength(45)]],
      'accEmail': ['', [Validators.required, Validators.email]],
      'accPhone':  ['', [Validators.required, Validators.maxLength(10)]],
      'accGender': ['0']
    });

  }

  checkConfirmPassword() {
    const pass = this.accountDetailForm.get('accPassword').value;
    const confirmPass = this.accountDetailForm.get('accConfirmPassword').value;

    if (pass !== confirmPass) {
      this.accountDetailForm.get('accConfirmPassword').setErrors({notMatch: true});
    } else {
      this.accountDetailForm.get('accConfirmPassword').setErrors(null);
    }
  }

  getAccountByID(accountID): void {
    const self = this;
    this.accountDetailService.getAccountByID(accountID).subscribe((account) => {
      this.accountDetail = account;
      this.accountDetailForm.setValue({
        'accUsername': self.accountDetail.username,
        'accPassword':  self.accountDetail.password,
        'accConfirmPassword':  self.accountDetail.password,
        'accFullname':  self.accountDetail.fullName,
        'accEmail':  self.accountDetail.email,
        'accPhone':  self.accountDetail.phone,
        'accGender': String(self.accountDetail.gender)
      });
    }, (error) => {
      console.log(error);
    });
  }

  saveAccountDetail() {
    const self = this;
    if (this.valueIsChecked()) {
      this.accountDetailService.updateAccountByID(self.accountDetail).subscribe((message) => {
          window.alert('Update ' + self.accountDetail.username + ' successfully !');
          this.router.navigate(['/profile']);
      }, (error) => {
          console.log(error);
      });
    } else {
      window.alert('Form is not valid !');
    }
  }


  valueIsChecked(): boolean {
    if (this.accountDetailForm.valid) {
      if (!this.accountDetailForm.get('accUsername').value.valid) {
        this.accountDetail.username = this.accountDetailForm.get('accUsername').value;
      }
      if (!this.accountDetailForm.get('accPassword').value.valid) {
        if (this.accountDetailForm.get('accConfirmPassword').getError('notMatch') == null) {
          this.accountDetail.password = this.accountDetailForm.get('accPassword').value;
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
      this.accountDetail.updatedBy = localStorage.getItem('accountUsername');
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

  isNotMatch(fieldName: string) {
    this.checkConfirmPassword();
    return this.accountDetailForm.get(fieldName).getError('notMatch')
    && (this.accountDetailForm.get(fieldName).dirty || this.accountDetailForm.get(fieldName).touched) && this.accountDetailForm.get(fieldName);
  }

  isMatch(fieldName: string) {
    this.checkConfirmPassword();
    return this.accountDetailForm.get(fieldName).getError('notMatch') == null;
  }

  // ---- Check validate when user input (Invalid)
  isValid(fieldName: string) {
    return this.accountDetailForm.get(fieldName).valid;
  }


}
