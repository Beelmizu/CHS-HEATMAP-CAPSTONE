import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxPaginationModule} from 'ngx-pagination';
import { NgModel } from '@angular/forms/src/directives/ng_model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap';
import { StatisticComponent } from './statistic.component';
import { StatisticRoutingModule } from './statistic-routing.module';


import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule,
  MatNativeDateModule,
  MatDatepickerModule
} from '@angular/material';
import { ChartsModule } from 'ng2-charts';
import { MonthyearpickerComponent } from '../monthyearpicker/monthyearpicker.component';
import { FulldatepickerComponent } from '../fulldatepicker/fulldatepicker.component';
import { FulldatepickerModule } from '../fulldatepicker/fulldatepicker.module';
import { StatisticCameraComponent } from '../statistic-camera/statistic-camera.component';
import { StatisticStoreComponent } from '../statistic-store/statistic-store.component';
import { StatisticAreaComponent } from '../statistic-area/statistic-area.component';
import { StatisticAgeComponent } from '../statistic-age/statistic-age.component';
import { StatisticGenderComponent } from '../statistic-gender/statistic-gender.component';


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
    ChartsModule,
    StatisticRoutingModule,
    CommonModule,
    NgxPaginationModule,
    modules,
    FormsModule,
    ReactiveFormsModule,
    FulldatepickerModule,
    BsDropdownModule.forRoot()
  ],
  exports: [
    modules
  ],
  declarations: [
    StatisticComponent,
    StatisticCameraComponent,
    StatisticAreaComponent,
    StatisticStoreComponent,
    MonthyearpickerComponent,
    StatisticAgeComponent,
    StatisticGenderComponent
  ],
  providers: [  ]
})
export class StatisticModule { }
