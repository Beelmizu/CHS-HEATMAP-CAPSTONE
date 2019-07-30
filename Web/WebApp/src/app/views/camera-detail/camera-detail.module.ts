import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxPaginationModule} from 'ngx-pagination';
import { NgModel } from '@angular/forms/src/directives/ng_model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap';
import { CameraDetailComponent } from './camera-detail.component';
import { CameraDetailService } from '../../services/camera-detail.service';
import { ChartsModule } from 'ng2-charts';
import { StreamService } from '../../services/stream.service';
import { FulldatepickerComponent } from '../fulldatepicker/fulldatepicker.component';


@NgModule({
  imports: [
    ChartsModule,
    CommonModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot()
  ],
  declarations: [ CameraDetailComponent ],
  providers: [ CameraDetailService, StreamService ]
})
export class CameraDetailModule { }
