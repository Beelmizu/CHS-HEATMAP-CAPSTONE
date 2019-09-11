import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxPaginationModule} from 'ngx-pagination';
import { NgModel } from '@angular/forms/src/directives/ng_model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap';
import { ZoneService } from '../../services/zone.service';
import { CameraRoutingModule } from './camera-routing.module';
import { CameraComponent } from './camera.component';
import { CameraService } from '../../services/camera.service';


@NgModule({
  imports: [
    CameraRoutingModule,
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot()
  ],
  declarations: [ CameraComponent ],
  providers: [ CameraService ]
})
export class CameraModule { }
