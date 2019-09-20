import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxPaginationModule} from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap';
import { ProfileComponent } from './profile.component';
import { AccountDetailService } from '../../services/account-detail.service';
import { ProfileRoutingModule } from './profile-routing.module';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { NgxPasswordToggleModule } from 'ngx-password-toggle';


@NgModule({
  imports: [
    ProfileRoutingModule,
    CommonModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    NgxPasswordToggleModule
  ],
  declarations: [ ProfileComponent, ChangePasswordComponent, EditProfileComponent ],
  providers: [ AccountDetailService ]
})
export class ProfileModule { }
