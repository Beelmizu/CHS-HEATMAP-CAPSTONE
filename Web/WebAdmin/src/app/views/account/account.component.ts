import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { FormGroup, FormBuilder } from '../../../../node_modules/@angular/forms';
import { Account } from '../../models/account.model';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  accountForm: FormGroup;
  accounts: Account[];

  companyID: number;

  constructor(
    private router: Router,
    private accountService: AccountService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const self = this;

    this.accountForm = this.fb.group({
      'searchValue': ''
    });

    this.route.params.subscribe(params => {
      this.companyID = params.idCompany;
      if (this.companyID != null) {
        this.getAccountByCompany(this.companyID);
      }
    });
  }

  getAllAccounts() {
    const self = this;
    this.accountService.getAllAccount().subscribe((accountList) => {
      this.accounts = accountList;
    }, (error) => {
      console.log(error);
    });
  }

  searchByUsernameOrFullname(searchValue: String): void {
    const self = this;
    if (searchValue === '') {
      this.getAllAccounts();
    } else {
      this.accountService.getAccountByValue(searchValue).subscribe((accountList) => {
        this.accounts = accountList;
      }, (error) => {
        console.log(error);
      });
    }
  }

  getAccountByCompany(id: number) {
    const self = this;
    this.accountService.getAccountByCompany(id).subscribe((accountList) => {
      this.accounts = accountList;
    }, (error) => {
      console.log(error);
    });
  }

}
