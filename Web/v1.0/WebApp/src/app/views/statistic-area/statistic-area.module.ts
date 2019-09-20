import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxPaginationModule} from 'ngx-pagination';
import { NgModel } from '@angular/forms/src/directives/ng_model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule, MonthPickerComponent } from 'ngx-bootstrap';
import { ChartsModule } from 'ng2-charts';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule,
  MatNativeDateModule,
  MatDatepickerModule
} from '@angular/material';
import { FulldatepickerComponent } from '../fulldatepicker/fulldatepicker.component';
import { MonthyearpickerComponent } from '../monthyearpicker/monthyearpicker.component';
import { StatisticAreaRoutingModule } from './statistic-area-routing.module';
import { StatisticAreaComponent } from './statistic-area.component';


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
    StatisticAreaRoutingModule,
    ChartsModule,
    CommonModule,
    NgxPaginationModule,
    FormsModule,
    modules,
    ReactiveFormsModule,
    BsDropdownModule.forRoot()
  ],
  exports: [
    modules
  ],
  declarations: [ StatisticAreaComponent, MonthyearpickerComponent, FulldatepickerComponent],
  providers: [  ]
})
export class StatisticAreaModule { }
