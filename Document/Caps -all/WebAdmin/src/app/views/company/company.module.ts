import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxPaginationModule} from 'ngx-pagination';
import { NgModel } from '@angular/forms/src/directives/ng_model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap';
import { CompanyRoutingModule } from './company-routing.module';
import { CompanyComponent } from './company.component';
import { CompanyService } from '../../services/company.service';
import { CompanyDetailComponent } from '../company-detail/company-detail.component';
import { StoreComponent } from '../store/store.component';
import { StoreDetailComponent } from '../store-detail/store-detail.component';
import { AreaComponent } from '../area/area.component';
import { AreaDetailComponent } from '../area-detail/area-detail.component';
import { CameraComponent } from '../camera/camera.component';
import { CameraDetailComponent } from '../camera-detail/camera-detail.component';
import { AccountComponent } from '../account/account.component';
import { AccountDetailComponent } from '../account-detail/account-detail.component';


@NgModule({
  imports: [
    CompanyRoutingModule,
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot()
  ],
  declarations: [
      CompanyComponent,
      CompanyDetailComponent,
      AccountComponent,
      AccountDetailComponent,
      StoreComponent,
      StoreDetailComponent,
      AreaComponent,
      AreaDetailComponent,
      CameraComponent,
      CameraDetailComponent
  ],
  providers: [ CompanyService ]
})
export class CompanyModule { }
