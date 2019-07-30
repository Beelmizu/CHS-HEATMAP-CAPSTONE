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
import { StatisticStoreRoutingModule } from './statistic-store-routing.module';
import { StatisticStoreComponent } from './statistic-store.component';



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
    StatisticStoreRoutingModule,
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
  declarations: [ StatisticStoreComponent, MonthyearpickerComponent, FulldatepickerComponent],
  providers: [  ]
})
export class StatisticAreaModule { }
