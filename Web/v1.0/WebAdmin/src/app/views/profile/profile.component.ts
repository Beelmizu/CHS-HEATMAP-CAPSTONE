import { Component, OnInit } from '@angular/core';
import { Account } from '../../models/account.model';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountDetailService } from '../../services/account-detail.service';
import { Location } from '@angular/common';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  constructor(

  ) { }

  ngOnInit() {

  }


}
