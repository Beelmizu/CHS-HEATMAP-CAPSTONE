import { Component, OnInit } from '@angular/core';
import { Account } from '../../models/account.model';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountDetailService } from '../../services/account-detail.service';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  accountDetail = new Account;
  accountDetailForm: FormGroup;
  accountID: string;

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

    self.accountDetailForm = self.fb.group({
      'accUsername': ['', [Validators.required, Validators.maxLength(20)]],
      'accFullname': ['', [Validators.required, Validators.maxLength(45)]],
      'accEmail': ['', [Validators.required, Validators.email]],
      'accPhone': ['', [Validators.required, Validators.maxLength(10)]],
      'accGender': ['0']
    });

  }

  getAccountByID(accountID): void {
    const self = this;
    this.accountDetailService.getAccountByID(accountID).subscribe((account) => {
      this.accountDetail = account;
      this.accountDetailForm.setValue({
        'accUsername': self.accountDetail.username,
        'accFullname': self.accountDetail.fullName,
        'accEmail': self.accountDetail.email,
        'accPhone': self.accountDetail.phone,
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
        this.toastr.success('Save ' + self.accountDetail.username + ' successfully !', 'Success');
        this.router.navigate(['/company']);
      }, (error) => {
        console.log(error);
      });
    } else {
      this.toastr.warning('Form is not valid !', 'Warning');
    }
  }


  valueIsChecked(): boolean {
    if (this.accountDetailForm.valid) {
      if (!this.accountDetailForm.get('accUsername').value.valid) {
        this.accountDetail.username = this.accountDetailForm.get('accUsername').value;
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
}
