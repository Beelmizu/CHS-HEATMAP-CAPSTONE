import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxPaginationModule} from 'ngx-pagination';
import { NgModel } from '@angular/forms/src/directives/ng_model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap';
import { ProfileComponent } from './profile.component';
import { AccountDetailService } from '../../services/account-detail.service';
import { ProfileRoutingModule } from './profile-routing.module';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  imports: [
    ProfileRoutingModule,
    CommonModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot()
  ],
  declarations: [ ProfileComponent, ChangePasswordComponent, EditProfileComponent ],
  providers: [ AccountDetailService ]
})
export class ProfileModule { }
