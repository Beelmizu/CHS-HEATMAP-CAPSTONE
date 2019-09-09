import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDatepicker } from '@angular/material';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment, Moment } from 'moment';
import { FormControl, Form } from '@angular/forms';
import { Camera } from '../../models/camera.model';
import { ReportService } from '../../services/report.service';
import { DateFormatter } from 'ngx-bootstrap';


const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'DD MM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'DD MMMM YYYY',
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

  @Input() dateFromParentComponent: string;

  selectedDate = new FormControl(moment());
  // @Input() cameraDetail: Camera;
  @Output() date: EventEmitter<any> = new EventEmitter<any>();

  cameraDetail: Camera;

  constructor(
    private reportService: ReportService
  ) { }

  ngOnInit() {
    if (this.dateFromParentComponent !== undefined) {
      this.selectedDate.setValue(this.dateFromParentComponent);
    } else {
      this.selectedDate.setValue('');
    }
  }

  change(dateEvent) {
    this.date.emit(dateEvent.value);
  }

}
