import { Component, OnInit, ViewChild, SimpleChanges, OnDestroy } from '@angular/core';
import { ChartOptions, ChartDataSets } from 'chart.js';
import { BaseChartDirective, Color } from 'ng2-charts';

// Import for chart
import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ReportService } from '../../services/report.service';
import { Camera } from '../../models/camera.model';
import { CameraService } from '../../services/camera.service';
import { CameraDetailService } from '../../services/camera-detail.service';
import { ZoneService } from '../../services/zone.service';
import { Zone } from '../../models/zone.model';
import { Store } from '../../models/store.model';
import { StoreService } from '../../services/store.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { StatisticDialogComponent } from '../statistic-dialog/statistic-dialog.component';
import { TrafficService } from '../../services/traffic.service';

@Component({
  selector: 'app-statistic-traffic',
  templateUrl: './statistic-traffic.component.html',
  styleUrls: ['./statistic-traffic.component.scss']
})
export class StatisticTrafficComponent implements OnInit, OnDestroy {


  zoneDetail: Zone;
  storeDetail: Store;
  cameraDetail: Camera;
  accountID: string;

  // Form
  selectTimeForm: FormGroup;
  storeDetailForm: FormGroup;

  // Chart
  selectedValue = null;
  selectedValueMonth = null;
  selectedValueDate = null;
  timeForm: String;
  timeTo: String;
  modeStatistic: String;

  // List
  // tslint:disable-next-line: max-line-length
  listTimeFromRoot = ['0h', '1h', '2h', '3h', '4h', '5h', '6h', '7h', '8h', '9h', '10h', '11h', '12h', '13h', '14h', '15h', '16h', '17h', '18h', '19h', '20h', '21h', '22h', '23h'];
  // tslint:disable-next-line: max-line-length
  listTimeToRoot = ['1h', '2h', '3h', '4h', '5h', '6h', '7h', '8h', '9h', '10h', '11h', '12h', '13h', '14h', '15h', '16h', '17h', '18h', '19h', '20h', '21h', '22h', '23h'];

  // List
  listTime: String[];
  listTimeFrom: String[];
  listTimeTo: String[];
  listZone: Zone[];
  listCamera: Camera[];
  listStore: Store[];

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
            beginAtZero: true,
            stepSize: 1
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
    elements:
    {
      point:
      {
        radius: 3,
        hitRadius: 10,
        hoverRadius: 10,
        hoverBorderWidth: 2,
        borderWidth: 10,
      }
    },
    events: ['mousemove', 'click'],
    onHover: (event, chartElement) => {
      (<HTMLInputElement>event.target).style.cursor = chartElement[0] ? 'pointer' : 'default';
    }
  };
  public lineChartColors: Color[] = [
    { // blue
      backgroundColor: 'rgba(99, 194, 222,0.8)',
      borderColor: 'rgba(99, 194, 222, 1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // pink
      backgroundColor: 'rgba(248, 108, 107,0.8)',
      borderColor: 'rgba(248, 108, 107,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.8)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'bar';

  @ViewChild(BaseChartDirective, {}) chart: BaseChartDirective;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private reportService: ReportService,
    private route: ActivatedRoute,
    private cameraDetailService: CameraDetailService,
    private zoneService: ZoneService,
    private storeService: StoreService,
    private cameraService: CameraService,
    private toastr: ToastrService,
    private trafficService: TrafficService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    const self = this;
    this.accountID = localStorage.getItem('accountID');

    this.openDialog();

    // tslint:disable-next-line: max-line-length
    this.listTimeFrom = this.listTimeFromRoot;
    this.listTimeTo = this.listTimeToRoot;

    // declare Form
    this.storeDetailForm = this.fb.group({
      'storeName': [''],
      'storeAddress': [''],
      'storePhone': [''],
      // 'storeStatus': [''],
    });

    this.selectTimeForm = this.fb.group({
      'timeFrom': [this.listTimeFromRoot[0]],
      'timeTo': [this.listTimeToRoot[12]]
    });
    this.selectTimeForm.get('timeFrom').disable();
    this.selectTimeForm.get('timeTo').disable();

    this.getAllStoreOfAccount(+this.accountID);
  }

  ngOnDestroy(): void {
    this.dialog.closeAll();
  }

  getAllStoreOfAccount(accountID: number) {
    const self = this;
    this.storeService.getAllStoreByAccountID(accountID).subscribe((stores) => {
      this.listStore = stores;
    }, (error) => {
      console.log(error);
    });
  }

  chooseStore() {
    const self = this;
    this.storeService.getStoreByID(this.storeDetailForm.get('storeName').value).subscribe((store) => {
      this.storeDetail = store;
      this.zoneService.getAllZoneInStore(this.storeDetail.id).subscribe((zoneList) => {
        this.listZone = zoneList;
      });
      this.storeDetailForm.setValue({
        'storeName': this.storeDetail.id,
        'storeAddress': this.storeDetail.address,
        'storePhone': this.storeDetail.phone,
        // 'storeStatus': this.storeDetail.status,
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

  chooseStoreAfterChoose(storeID: number) {
    const self = this;
    this.storeService.getStoreByID(storeID).subscribe((store) => {
      this.storeDetail = store;
      // get all store and put it to the list box
      this.zoneService.getAllZoneInStore(this.storeDetail.id).subscribe((zoneList) => {
        this.listZone = zoneList;
      });
      this.storeDetailForm.setValue({
        'storeName': this.storeDetail.id,
        'storeAddress': this.storeDetail.address,
        'storePhone': this.storeDetail.phone,
        // 'storeStatus': this.storeDetail.status,
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

  bindingChartForDate(reports: any[]) {
    let arr: any[];
    this.lineChartData.length = 0;
    for (let j = 0; j < this.listTimeFromRoot.length; j++) {
      this.lineChartLabels.push(this.listTimeFromRoot[j]);
    }
    for (let i = 0; i < reports.length; i++) {
      arr = [];
      for (let j = 0; j < reports[i].length; j++) {
        arr.push(reports[i][j]);
      }
     
      this.lineChartData.push({
        data: arr,
        label: '' + this.listZone[i].name,
        yAxisID: 'y-axis-0'
      });
    }
   
  }

  bindingChartForMonth(reports: any[]) {
    let arr: any[];
    this.lineChartData.length = 0;
    for (let j = 1; j <= reports[0].length; j++) {
      this.lineChartLabels.push(j);
    }
    for (let i = 0; i < reports.length; i++) {
      arr = [];
      for (let j = 0; j < reports[i].length; j++) {
        arr.push(reports[i][j]);
      }
     
      this.lineChartData.push({
        data: arr,
        label: '' + this.listZone[i].name,
        yAxisID: 'y-axis-0'
      });
    }
  }

  catchDate(event) {
    if (this.storeDetail == null) {
      this.toastr.warning('Please choose store !', 'Warning');
    } else {
      this.selectedValue = event.format('YYYY-MM-DD');
      this.selectedValueDate = this.selectedValue;
      this.selectedValueMonth = null;
      this.selectTimeForm.setValue({
        'timeFrom': '00h',
        'timeTo': '23h',
      });
      this.selectTimeForm.get('timeFrom').enable();
      this.selectTimeForm.get('timeTo').enable();
      this.listTimeTo = this.listTimeToRoot;
      this.listTimeFrom = this.listTimeFromRoot;
      this.getReport();
    }
  }

  catchSelectedMonth(event) {
    if (this.storeDetail == null) {
      this.toastr.warning('Please choose store !', 'Warning');
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
    this.trafficService.getReportTrafficByTime(this.selectedValue, this.storeDetail.id).subscribe((reports) => {
      if (reports == null) {
        this.toastr.warning('No data', 'Warning');
        this.lineChartData.length = 1;
      } else {
        this.getAverageShoppingTimeTrafficByTime();
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
    this.trafficService.getReportTrafficByMonth(this.selectedValue, this.storeDetail.id).subscribe((reports) => {
      if (reports == null) {
        this.toastr.warning('No data', 'Warning');
        this.lineChartData.length = 1;
      } else {
        this.getAverageShoppingTimeTrafficByTime();
        this.bindingChartForMonth(reports);
      }
      this.chart.ngOnChanges({} as SimpleChanges);
    }, (error) => {
      console.log(error);
    });
  }
  getAverageShoppingTimeTrafficByTime() {
    this.trafficService.getAverageShoppingTimeTrafficByTime(this.selectedValue, this.storeDetail.id).subscribe((reports) => {
      // console.log(reports);
      for (let i = 0; i < this.listZone.length; i++) {
        this.listZone[i].averageShoppingTime = reports[i];
      }
    }, (error) => {
      console.log(error);
    });
    console.log(this.listZone);
  }
  // events Chart
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
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
      title: 'store'
    };

    setTimeout(() => this.dialog.open(StatisticDialogComponent, dialogConfig).afterClosed().subscribe((data) => {
      this.modeStatistic = 'day';
      if (data !== undefined) {
        this.selectedValue = data.date;
        this.selectedValueDate = this.selectedValue;
        this.selectTimeForm.setValue({
          'timeFrom': '00h',
          'timeTo': '23h'
        });
        this.selectTimeForm.get('timeFrom').enable();
        this.selectTimeForm.get('timeTo').enable();
        this.listTimeTo = this.listTimeToRoot;
        this.listTimeFrom = this.listTimeFromRoot;
        this.chooseStoreAfterChoose(data.idStore);
      }
    }, (error) => {
      console.log(error);
    }));
  }
}
