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
  MatDatepickerModule,
  MatDialogModule
} from '@angular/material';
import { ChartsModule } from 'ng2-charts';
import { MonthyearpickerComponent } from '../monthyearpicker/monthyearpicker.component';
import { FulldatepickerComponent } from '../fulldatepicker/fulldatepicker.component';
import { FulldatepickerModule } from '../fulldatepicker/fulldatepicker.module';
import { StatisticCameraComponent } from '../statistic-camera/statistic-camera.component';
import { StatisticStoreComponent } from '../statistic-store/statistic-store.component';
import { StatisticZoneComponent } from '../statistic-zone/statistic-zone.component';
import { StatisticTrafficComponent } from '../statistic-traffic/statistic-traffic.component';
import { StatisticGenderComponent } from '../statistic-gender/statistic-gender.component';
import { StatisticDialogComponent } from '../statistic-dialog/statistic-dialog.component';
import { ViewHeatmapDialogComponent } from '../view-heatmap-dialog/view-heatmap-dialog.component';
import { ViewHeatmapDialogZoneComponent } from '../view-heatmap-dialog-zone/view-heatmap-dialog-zone.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


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
    BsDropdownModule.forRoot(),
    MatDialogModule,
    NgbModule.forRoot()
  ],
  exports: [
    modules
  ],
  declarations: [
    StatisticComponent,
    StatisticCameraComponent,
    StatisticZoneComponent,
    StatisticStoreComponent,
    MonthyearpickerComponent,
    StatisticTrafficComponent,
    StatisticGenderComponent,
    StatisticDialogComponent,
    ViewHeatmapDialogComponent,
    ViewHeatmapDialogZoneComponent
  ],
  providers: [  ],
  entryComponents: [StatisticDialogComponent, ViewHeatmapDialogComponent, ViewHeatmapDialogZoneComponent]
})
export class StatisticModule { }
