import { Component, OnInit, ViewChild, SimpleChanges } from '@angular/core';
import { ChartOptions, ChartDataSets } from 'chart.js';
import { BaseChartDirective, Color } from 'ng2-charts';

// Import for chart
import * as _moment from 'moment';
import { default as _rollupMoment, Moment } from 'moment';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ReportService } from '../../services/report.service';
import { Camera } from '../../models/camera.model';
import { CameraService } from '../../services/camera.service';
import { CameraDetailService } from '../../services/camera-detail.service';
import { AreaService } from '../../services/area.service';
import { Area } from '../../models/area.model';

@Component({
  selector: 'app-statistic-area',
  templateUrl: './statistic-area.component.html',
  styleUrls: ['./statistic-area.component.scss']
})
export class StatisticAreaComponent implements OnInit {

  areaDetail: Area;
  cameraDetail: Camera;

  // Form
  selectTimeForm: FormGroup;
  areaDetailForm: FormGroup;

  // Chart
  selectedValue = null;
  timeForm: String;
  timeTo: String;
  modeStatistic: String;

  // List
  listTimeFromRoot = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];
  listTimeToRoot = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];
  listTimeFrom: String[];
  listTimeTo: String[];
  listArea: Area[];
  listCamera: Camera[];
  accountID: string;

  // Declare component of chart
  public lineChartData: ChartDataSets[] = [
    { data: [], label: '', yAxisID: 'y-axis-0' }
  ];
  public lineChartLabels: Array<any> = [];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
          ticks: {
            suggestedMin: 0,
            beginAtZero: true
          }
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };
  public lineChartColors: Color[] = [
    {
      // blue
      backgroundColor: 'rgba(99, 194, 222,0.2)',
      borderColor: 'rgba(99, 194, 222, 1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // pink
      backgroundColor: 'rgba(248, 108, 107,0.2)',
      borderColor: 'rgba(248, 108, 107,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';

  @ViewChild(BaseChartDirective, {}) chart: BaseChartDirective;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private reportService: ReportService,
    private route: ActivatedRoute,
    private cameraDetailService: CameraDetailService,
    private areaService: AreaService,
    private cameraService: CameraService
  ) { }

  ngOnInit() {
    const self = this;
    this.accountID  = localStorage.getItem('accountID');

    this.modeStatistic = 'month';
    this.listTimeFrom = this.listTimeFromRoot;
    this.listTimeTo = this.listTimeToRoot;

    // declare Form
    this.areaDetailForm = this.fb.group({
      'areaName': [''],
      'areaFloor': [''],
      'areaStore': [''],
      'areaStatus': [''],
    });

    this.selectTimeForm = this.fb.group({
      'timeFrom': [this.listTimeFrom[0]],
      'timeTo': [this.listTimeFrom[12]]
    });
    this.selectTimeForm.get('timeFrom').disable();
    this.selectTimeForm.get('timeTo').disable();

    this.getAllAreaOfAccount(+this.accountID);

  }

  getAllAreaOfAccount(accountID: number) {
    const self = this;
    this.areaService.getAllAreaOfAccount(accountID).subscribe((area) => {
      this.listArea = area;
    }, (error) => {
      console.log(error);
    });
  }

  chooseArea() {
    const self = this;
    this.areaService.getAreaByID(this.areaDetailForm.get('areaName').value).subscribe((area) => {
      this.areaDetail = area;
      this.cameraService.getAllCameraInArea(this.areaDetail.id).subscribe((cameralist) => {
        this.listCamera = cameralist;
      });
      this.areaDetailForm.setValue({
        'areaName': this.areaDetail.id,
        'areaFloor': this.areaDetail.floor,
        'areaStore': this.areaDetail.store.name,
        'areaStatus': this.areaDetail.status
      });
      if (this.selectedValue !== null) {
        if (this.modeStatistic === 'month') {
          this.getReportByMonth();
        } else {
          this.getReport();
        }
      }
    }, (error) => {
      console.log(error);
    });
  }

  getTheLargestList(report: any[]) {
    let maxValue = 0;
    for (let i = 1; i < report.length; i++) {
      if (report[i].length > report[maxValue].length) {
        maxValue = i;
      }
    }
    return maxValue;
  }

  bindingChartForDate(reports: any[]) {
    let time: String;
    let arr: any[];
    this.lineChartData.length = 0;
    const max = this.getTheLargestList(reports);
    for (let j = 0; j < reports[max].length; j++) {
      time = reports[max][j].time.split(' ')[1].split(':')[0] + ':' + reports[max][j].time.split(' ')[1].split(':')[1];
      this.lineChartLabels.push(time);
    }
    for (let index = 0; index < reports.length; index++) {
      arr = [];
      for (let j = 0; j < reports[index].length; j++) {
        arr.push(reports[index][j].count);
      }
      this.lineChartData.push({
        data: arr,
        label: 'Camera: ' + reports[index][0].cameraID,
        yAxisID: 'y-axis-0'
      });
    }
  }

  bindingChartForMonth(reports: any[]) {
    let arr: any[];
    this.lineChartData.length = 0;
    const max = this.getTheLargestList(reports);
    for (let j = 0; j < reports[max].length; j++) {
      this.lineChartLabels.push(reports[max][j].time);
    }
    for (let index = 0; index < reports.length; index++) {
      arr = [];
      for (let j = 0; j < reports[index].length; j++) {
        arr.push(reports[index][j].count);
      }
      this.lineChartData.push({
        data: arr,
        label: 'Camera: ' + reports[index][0].cameraID,
        yAxisID: 'y-axis-0'
      });
    }
  }

  catchDate(event) {
    if (this.areaDetail == null) {
      window.alert('Please choose area !');
    } else {
      this.selectedValue = event.format('YYYY-MM-DD');
      this.selectTimeForm.setValue({
        'timeFrom': '08:00',
        'timeTo': '20:00',
      });
      this.selectTimeForm.get('timeFrom').enable();
      this.selectTimeForm.get('timeTo').enable();
      this.listTimeTo = this.listTimeToRoot;
      this.listTimeFrom = this.listTimeFromRoot;
      this.getReport();
    }
  }

  catchSelectedMonth(event) {
    if (this.areaDetail == null) {
      window.alert('Please choose area !');
    } else {
      this.selectedValue = event.format('YYYY-MM');
      this.selectTimeForm.get('timeFrom').disable();
      this.selectTimeForm.get('timeTo').disable();
      this.listTimeTo = this.listTimeToRoot;
      this.listTimeFrom = this.listTimeFromRoot;
      this.getReportByMonth();
    }
  }

  // Choose time
  chooseTimeFrom() {
    const listTimeFlag = Array<String>();
    this.timeForm = this.selectTimeForm.get('timeFrom').value;
    this.timeTo = this.selectTimeForm.get('timeTo').value;
    this.listTimeFromRoot.forEach(element => {
      if (Number.parseInt(element.split(':')[0]) > Number.parseInt(this.timeForm.split(':')[0])) {
        listTimeFlag.push(element);
      }
    });
    this.listTimeTo = listTimeFlag;
    this.getReport();
  }

  chooseTimeTo() {
    const listTimeFlag = Array<String>();
    this.timeForm = this.selectTimeForm.get('timeFrom').value;
    this.timeTo = this.selectTimeForm.get('timeTo').value;
    this.listTimeFromRoot.forEach(element => {
      if (Number.parseInt(element.split(':')[0]) < Number.parseInt(this.timeTo.split(':')[0])) {
        listTimeFlag.push(element);
      }
    });
    this.listTimeFrom = listTimeFlag;
    this.getReport();
  }

  getReport() {
    const self = this;
    this.lineChartData[0].data.length = 0;
    this.lineChartLabels.length = 0;
    this.timeForm = this.selectTimeForm.get('timeFrom').value.split(':')[0];
    this.timeTo = this.selectTimeForm.get('timeTo').value.split(':')[0];
    this.reportService.getReportAreaByTime(this.selectedValue, this.areaDetail.id, this.timeForm, this.timeTo).subscribe((reports) => {
      if (reports == null) {
        window.alert('No data');
        this.lineChartData.length = 1;
      } else {
        this.bindingChartForDate(reports);
      }
      this.chart.ngOnChanges({} as SimpleChanges);
    }, (error) => {
      console.log(error);
    });
  }

  getReportByMonth() {
    const self = this;
    this.lineChartData[0].data.length = 0;
    this.lineChartLabels.length = 0;
    this.reportService.getReportAreaByMonth(this.selectedValue, this.areaDetail.id).subscribe((reports) => {
      if (reports == null) {
        window.alert('No data');
        this.lineChartData.length = 1;
      } else {
        this.bindingChartForMonth(reports);
      }
      this.chart.ngOnChanges({} as SimpleChanges);
    }, (error) => {
      console.log(error);
    });
  }

  // events Chart
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }


}