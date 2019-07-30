import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxPaginationModule} from 'ngx-pagination';
import { NgModel } from '@angular/forms/src/directives/ng_model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap';
import { ProfileComponent } from './profile.component';
import { AccountDetailService } from '../../services/account-detail.service';
import { ProfileRoutingModule } from './profile-routing.module';


@NgModule({
  imports: [
    ProfileRoutingModule,
    CommonModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot()
  ],
  declarations: [ ProfileComponent ],
  providers: [ AccountDetailService ]
})
export class ProfileModule { }
