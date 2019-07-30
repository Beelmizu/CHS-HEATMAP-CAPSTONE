import { Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDatepicker } from '@angular/material';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment, Moment} from 'moment';
import { FormControl } from '@angular/forms';
import { Camera } from '../../models/camera.model';
import { ReportService } from '../../services/report.service';


const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/DD/YYYY',
  },
  display: {
    dateInput: 'MM/DD/YYYY',
    monthYearLabel: 'MMM DD YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM DD YYYY',
  },
};

@Component({
  selector: 'app-fulldatepicker',
  templateUrl: './fulldatepicker.component.html',
  styleUrls: ['./fulldatepicker.component.scss'],
  providers: [

    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class FulldatepickerComponent implements OnInit {

  selectedDate = new FormControl(moment());
  // @Input() cameraDetail: Camera;
  @Output() date: EventEmitter<any> = new EventEmitter<any>();

  cameraDetail: Camera;

  constructor(
    private reportService: ReportService
  ) { }

  ngOnInit() {
    this.selectedDate.setValue('');
  }

  change(dateEvent) {
    this.date.emit(dateEvent.value);
  }

}
