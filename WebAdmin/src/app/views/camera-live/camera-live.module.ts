import { CameraLiveService } from './../../services/camera-live.service';
import { BsDropdownModule } from 'ngx-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxPaginationModule} from 'ngx-pagination';
import { NgModel } from '@angular/forms/src/directives/ng_model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CameraLiveRoutingModule } from './camera-live-routing.module';


@NgModule({
  imports: [
    CameraLiveRoutingModule,
    CommonModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot()
  ],
  declarations: [],
  providers: [ CameraLiveService ]
})
export class CameraLiveModule { }
