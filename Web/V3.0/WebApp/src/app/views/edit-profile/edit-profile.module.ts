import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxPaginationModule} from 'ngx-pagination';
import { NgModel } from '@angular/forms/src/directives/ng_model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap';
import { AccountDetailService } from '../../services/account-detail.service';
import { EditProfileComponent } from './edit-profile.component';
import { EditProfileRoutingModule } from './edit-profile-routing.module';


@NgModule({
  imports: [
    EditProfileRoutingModule,
    CommonModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot()
  ],
  declarations: [ EditProfileComponent ],
  providers: [ AccountDetailService ]
})
export class ChangePasswordModule { }
