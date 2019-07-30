import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxPaginationModule} from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap';
import { StoreComponent } from './store.component';
import { StoreRoutingModule } from './store-routing.module';
import { RouterModule } from '@angular/router';
import { StoreService } from '../../services/store.service';
import { AreaComponent } from '../area/area.component';
import { CameraComponent } from '../camera/camera.component';
import { CameraDetailComponent } from '../camera-detail/camera-detail.component';

import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule,
  MatNativeDateModule,
  MatDatepickerModule
} from '@angular/material';
import { FulldatepickerComponent } from '../fulldatepicker/fulldatepicker.component';
import { FulldatepickerModule } from '../fulldatepicker/fulldatepicker.module';


const modules = [
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule,
  MatDatepickerModule,
  MatNativeDateModule,
];

@NgModule({
  imports: [
    StoreRoutingModule,
    CommonModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    modules,
    FulldatepickerModule,
    BsDropdownModule.forRoot()
  ],
  exports: [
    modules
  ],
  declarations: [
    StoreComponent,
    AreaComponent,
    CameraComponent,
    CameraDetailComponent
  ],
  providers: [ StoreService ]
})
export class StoreModule {}
