import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDatepicker } from '@angular/material';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment, Moment} from 'moment';
import { FormControl } from '@angular/forms';


const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-monthyearpicker',
  templateUrl: './monthyearpicker.component.html',
  styleUrls: ['./monthyearpicker.component.scss'],
  providers: [

    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class MonthyearpickerComponent implements OnInit {


  constructor() { }

  selectedMonth = new FormControl(moment());
  @Output() month: EventEmitter<any> = new EventEmitter<any>();


  ngOnInit() {
    this.selectedMonth.setValue('');
  }

  chosenYearHandler(normalizedYear: Moment) {
    this.selectedMonth = new FormControl(moment());
    const ctrlValue = this.selectedMonth.value;
    ctrlValue.year(normalizedYear.year());
    this.selectedMonth.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.selectedMonth.value;
    ctrlValue.month(normalizedMonth.month());
    this.selectedMonth.setValue(ctrlValue);
    this.month.emit(this.selectedMonth.value);
    datepicker.close();
  }
}
