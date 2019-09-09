import { NgModule } from '@angular/core';
import { SocketConnectService } from '../../services/socket-connect.service';
import { CommonModule } from '@angular/common';
import {NgxPaginationModule} from 'ngx-pagination';
import { NgModel } from '@angular/forms/src/directives/ng_model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap';
import { CameraDetailComponent } from './camera-detail.component';
import { CameraDetailService } from '../../services/camera-detail.service';


@NgModule({
  imports: [
    CommonModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot()
  ],
  declarations: [ CameraDetailComponent ],
  providers: [ CameraDetailService, SocketConnectService]
})
export class CameraDetailModule { }
