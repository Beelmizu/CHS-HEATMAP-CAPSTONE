import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxPaginationModule} from 'ngx-pagination';
import { NgModel } from '@angular/forms/src/directives/ng_model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap';
import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { AccountService } from '../../services/account.service';
import { AccountDetailComponent } from '../account-detail/account-detail.component';


@NgModule({
  imports: [
    AccountRoutingModule,
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot()
  ],
  declarations: [ AccountComponent, AccountDetailComponent ],
  providers: [ AccountService ]
})
export class AccountModule { }
