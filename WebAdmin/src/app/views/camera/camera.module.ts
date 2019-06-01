import { BsDropdownModule } from 'ngx-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxPaginationModule} from 'ngx-pagination';
import { NgModel } from '@angular/forms/src/directives/ng_model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CameraRoutingModule } from './camera-routing.module';
import { CameraLiveComponent } from '../camera-live/camera-live.component';
import { HeatmapComponent } from '../heatmap/heatmap.component';


@NgModule({
  imports: [
    CameraRoutingModule,
    CommonModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot()
  ],
  declarations: [
      CameraLiveComponent,
      HeatmapComponent
  ],
  providers: [  ]
})
export class CameraModule { }
