import { Component, OnInit, ViewChild, SimpleChanges, OnDestroy } from '@angular/core';
import { ChartOptions, ChartDataSets } from 'chart.js';
import { BaseChartDirective, Color } from 'ng2-charts';

// Import for chart
import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ReportService } from '../../services/report.service';
import { Report } from '../../models/report.model';
import { Camera } from '../../models/camera.model';
import { CameraService } from '../../services/camera.service';
import { CameraDetailService } from '../../services/camera-detail.service';
import { AreaService } from '../../services/area.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { StatisticDialogComponent } from '../statistic-dialog/statistic-dialog.component';
import { FulldatepickerComponent } from '../fulldatepicker/fulldatepicker.component';
import { ViewHeatmapDialogComponent } from '../view-heatmap-dialog/view-heatmap-dialog.component';


@Component({
  selector: 'app-statistic-camera',
  templateUrl: './statistic-camera.component.html',
  styleUrls: ['./statistic-camera.component.scss']
})
export class StatisticCameraComponent implements OnInit, OnDestroy {


  cameraDetail: Camera;
  accountID: string;

  // Form
  selectTimeForm: FormGroup;
  cameraDetailForm: FormGroup;

  // Chart
  selectedValue = null;
  selectedValueMonth = null;
  selectedValueDate = null;

  timeForm: String;
  timeTo: String;
  modeStatistic: String;

  // List
  listTimeFromRoot = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];
  listTimeToRoot = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];

  listTimeTo: String[];
  listTimeFrom: String[];
  listCamera: Camera[];

  // Declare component of chart
  public lineChartData: ChartDataSets[] = [
    { data: [], label: 'People', yAxisID: 'y-axis-0' }
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
    { // blue
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
    private cameraService: CameraService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    const self = this;
    this.accountID = localStorage.getItem('accountID');

    this.openDialog();

    this.listTimeFrom = this.listTimeFromRoot;
    this.listTimeTo = this.listTimeToRoot;

    // declare Form
    this.cameraDetailForm = this.fb.group({
      'cameraIP': [''],
      'cameraArea': [''],
      'cameraStore': [''],
      // 'cameraStatus': [''],
    });

    this.selectTimeForm = this.fb.group({
      'timeFrom': [this.listTimeFromRoot[0]],
      'timeTo': [this.listTimeFromRoot[12]]
    });
    this.selectTimeForm.get('timeFrom').disable();
    this.selectTimeForm.get('timeTo').disable();

    this.getAllCameraOfAccount(+this.accountID);

  }

  ngOnDestroy(): void {
    this.dialog.closeAll();
  }

  getAllCameraOfAccount(accountID: number) {
    const self = this;
    this.cameraService.getAllCameraOfAccount(accountID).subscribe((camera) => {
      this.listCamera = camera;
    }, (error) => {
      console.log(error);
    });
  }

  chooseCamera() {
    const self = this;
    this.cameraService.getCameraByIP(this.cameraDetailForm.get('cameraIP').value).subscribe((camera) => {
      this.cameraDetail = camera;
      this.cameraDetailForm.setValue({
        'cameraIP': this.cameraDetailForm.get('cameraIP').value,
        'cameraArea': camera.area.name,
        'cameraStore': camera.area.store.name,
        // 'cameraStatus': camera.status
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

  chooseCameraAfterChoose(ip: String) {
    const self = this;
    this.cameraService.getCameraByIP(ip).subscribe((camera) => {
      this.cameraDetail = camera;
      this.cameraDetailForm.setValue({
        'cameraIP': ip,
        'cameraArea': camera.area.name,
        'cameraStore': camera.area.store.name,
        // 'cameraStatus': camera.status
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

  bindingChartForDate(reports: Report[]) {
    // tslint:disable-next-line: prefer-const
    let arr = [];
    let time: String;
    this.lineChartData.length = 0;
    reports.forEach(element => {
      arr.push(element.count);
      time = element.time.split(' ')[1].split(':')[0] + ':' + element.time.split(' ')[1].split(':')[1];
      this.lineChartLabels.push(time);
    });
    this.lineChartData.push({
      data: arr,
      label: 'People',
      yAxisID: 'y-axis-0'
    });
  }

  bindingChartForMonth(reports: Report[]) {
    // tslint:disable-next-line: prefer-const
    let arr = [];
    this.lineChartData.length = 0;
    reports.forEach(element => {
      arr.push(element.count);
      this.lineChartLabels.push(element.time.split('-')[2] + '-' + element.time.split('-')[1]);
    });
    this.lineChartData.push({
      data: arr,
      label: 'People',
      yAxisID: 'y-axis-0'
    });
  }

  catchDate(event) {
    if (this.cameraDetail == null) {
      this.toastr.warning('Please choose camera !', 'Warning');
    } else {
      this.selectedValue = event.format('YYYY-MM-DD');
      this.selectedValueDate = this.selectedValue;
      this.selectedValueMonth = null;
      this.selectTimeForm.setValue({
        'timeFrom': '08:00',
        'timeTo': '20:00'
      });
      this.selectTimeForm.get('timeFrom').enable();
      this.selectTimeForm.get('timeTo').enable();
      this.listTimeTo = this.listTimeToRoot;
      this.listTimeFrom = this.listTimeFromRoot;
      this.getReport();
    }
  }

  catchSelectedMonth(event) {
    if (this.cameraDetail == null) {
      this.toastr.warning('Please choose camera !', 'Warning');
    } else {
      this.selectedValue = event.format('YYYY-MM');
      this.selectedValueMonth = this.selectedValue;
      this.selectedValueDate = null;
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
    this.reportService.getReportByTime(this.selectedValue, this.cameraDetail.id, this.timeForm, this.timeTo).subscribe((reports) => {
      if (reports == null) {
        this.toastr.warning('No data', 'Warning');
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
    this.reportService.getReportByMonth(this.selectedValue, this.cameraDetail.id).subscribe((reports) => {
      if (reports == null) {
        this.toastr.warning('No data', 'Warning');
      } else {
        this.bindingChartForMonth(reports);
      }
      this.chart.ngOnChanges({} as SimpleChanges);
    }, (error) => {
      console.log(error);
    });
  }

  // Get detail Camera by ID
  getCameraByID(cameraID): void {
    const self = this;
    this.cameraDetailService.getCameraByID(cameraID).subscribe((camera) => {
      this.cameraDetail = camera;
    }, (error) => {
      console.log(error);
    });
  }

  // events Chart
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      id: this.cameraDetail.id,
      date: this.selectedValueDate,
      from: this.lineChartLabels[active[0]['_index']],
      to: this.lineChartLabels[active[0]['_index'] + 1],
    };

    const dialogRef = this.dialog.open(ViewHeatmapDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data) => {
    }, (error) => {
      console.log(error);
    });
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  // Dialog
  openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      id: this.accountID,
      title: 'camera'
    };

    setTimeout(() => this.dialog.open(StatisticDialogComponent, dialogConfig).afterClosed().subscribe((data) => {
      this.modeStatistic = 'day';
      this.selectedValue = data.date;
      this.selectedValueDate = this.selectedValue;
      this.selectTimeForm.setValue({
        'timeFrom': '08:00',
        'timeTo': '20:00'
      });
      this.selectTimeForm.get('timeFrom').enable();
      this.selectTimeForm.get('timeTo').enable();
      this.listTimeTo = this.listTimeToRoot;
      this.listTimeFrom = this.listTimeFromRoot;
      this.chooseCameraAfterChoose(data.value);
    }, (error) => {
      console.log(error);
    }));
  }
}
