import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxPaginationModule} from 'ngx-pagination';
import { NgModel } from '@angular/forms/src/directives/ng_model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap';
import { AccountDetailService } from '../../services/account-detail.service';


@NgModule({
  imports: [
    CommonModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot()
  ],
  declarations: [],
  providers: [ AccountDetailService ]
})
export class AccountDetailModule { }
