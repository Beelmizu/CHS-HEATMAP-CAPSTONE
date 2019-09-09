import { Component, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Zone } from '../../models/zone.model';
import { Store } from '../../models/store.model';
import { Camera } from '../../models/camera.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ReportService } from '../../services/report.service';
import { CameraDetailService } from '../../services/camera-detail.service';
import { ZoneService } from '../../services/zone.service';
import { StoreService } from '../../services/store.service';
import { CameraService } from '../../services/camera.service';
import { ChartType, ChartOptions } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-statistic-age',
  templateUrl: './statistic-age.component.html',
  styleUrls: ['./statistic-age.component.scss']
})
export class StatisticAgeComponent implements OnInit {

  zoneDetail: Zone;
  storeDetail: Store;
  cameraDetail: Camera;

  // Form
  selectTimeForm: FormGroup;
  storeDetailForm: FormGroup;

  // Chart
  selectedValue = null;
  timeForm: String;
  timeTo: String;
  modeStatistic: String;

  // List
  listTime: String[];
  listTimeFrom: String[];
  listTimeTo: String[];
  listZone: Zone[];
  listCamera: Camera[];
  listStore: Store[];

  // Pie
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'left',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  public pieChartLabels: Array<any> = ['(0-2)', '(4-6)', '(8-12)', '(15-20)', '(25-32)', '(38-43)', '(48-53)', '(60-100)'];
  public pieChartData: number[] = [300, 500, 200, 300, 400, 200, 200, 300];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: [
        'rgb(255, 193, 7)',
        'rgb(99, 194, 222)',
        'rgb(77, 189, 116)',
        'rgb(248, 108, 107)',
        'rgb(0, 178, 238)',
        'rgb(255 , 127 , 0)',
        'rgb(102, 205, 170)',
        'rgb(255, 69, 0)'
      ],
    },
  ];

  @ViewChild(BaseChartDirective)
  public chart: BaseChartDirective;


  constructor(
    private router: Router,
    private fb: FormBuilder,
    private reportService: ReportService,
    private route: ActivatedRoute,
    private cameraDetailService: CameraDetailService,
    private zoneService: ZoneService,
    private storeService: StoreService,
    private cameraService: CameraService
  ) { }

  ngOnInit() {
    const self = this;

    this.modeStatistic = 'month';

    // tslint:disable-next-line: max-line-length
    this.listTime = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];
    // tslint:disable-next-line: max-line-length
    this.listTimeFrom = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];
    this.listTimeTo = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];

    // declare Form
    this.storeDetailForm = this.fb.group({
      'storeName': [''],
      'storeAddress': [''],
      'storePhone': [''],
      'storeStatus': [''],
    });

    this.selectTimeForm = this.fb.group({
      'timeFrom': [this.listTime[0]],
      'timeTo': [this.listTime[12]]
    });
    this.selectTimeForm.get('timeFrom').disable();
    this.selectTimeForm.get('timeTo').disable();

    this.getAllStoreOfAccount();

  }

  getAllStoreOfAccount() {
    const self = this;
    this.storeService.getAllStoreByAccountID(2).subscribe((stores) => {
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
        'storeStatus': this.storeDetail.status,
      });
      if (this.selectedValue !== null) {
        if (this.modeStatistic === 'month') {
          // this.getReportByMonth();
        } else {
          this.getReport();
        }
      }
    }, (error) => {
      console.log(error);
    });
  }

  catchDate(event) {
    if (this.storeDetail == null) {
      window.alert('Please choose store !');
    } else {
      this.selectedValue = event.format('YYYY-MM-DD');
      this.selectTimeForm.setValue({
        'timeFrom': '08:00',
        'timeTo': '20:00',
      });
      this.selectTimeForm.get('timeFrom').enable();
      this.selectTimeForm.get('timeTo').enable();
      // this.getReport();
    }
  }

  catchSelectedMonth(event) {
    if (this.storeDetail == null) {
      window.alert('Please choose store !');
    } else {
      this.selectedValue = event.format('YYYY-MM');
      this.selectTimeForm.get('timeFrom').disable();
      this.selectTimeForm.get('timeTo').disable();
      this.getReportByMonth();
    }
  }

  // Choose time
  chooseTimeFrom() {
    const listTimeFlag = Array<String>();
    this.timeForm = this.selectTimeForm.get('timeFrom').value;
    this.timeTo = this.selectTimeForm.get('timeTo').value;
    this.listTimeTo.length = 0;
    this.listTime.forEach(element => {
      if (Number.parseInt(element.split(':')[0]) > Number.parseInt(this.timeForm.split(':')[0])) {
        listTimeFlag.push(element);
      }
    });
    this.listTimeTo = listTimeFlag;
    // this.getReport();
  }

  chooseTimeTo() {
    const listTimeFlag = Array<String>();
    this.timeForm = this.selectTimeForm.get('timeFrom').value;
    this.timeTo = this.selectTimeForm.get('timeTo').value;
    this.listTimeFrom.length = 0;
    this.listTime.forEach(element => {
      if (Number.parseInt(element.split(':')[0]) < Number.parseInt(this.timeTo.split(':')[0])) {
        listTimeFlag.push(element);
      }
    });
    this.listTimeFrom = listTimeFlag;
    // this.getReport();
  }

  getReport() {
    const self = this;
    this.timeForm = this.selectTimeForm.get('timeFrom').value.split(':')[0];
    this.timeTo = this.selectTimeForm.get('timeTo').value.split(':')[0];
    // tslint:disable-next-line: max-line-length
    this.reportService.getReportAgeGenderStoreByTime(this.selectedValue, this.storeDetail.id, this.timeForm, this.timeTo).subscribe((reports) => {
      if (reports == null) {
        window.alert('No data');
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
    this.reportService.getReportAgeGenderStoreByMonth(this.selectedValue, this.storeDetail.id).subscribe((reports) => {
      if (reports == null) {
        window.alert('No data');
      } else {
        this.bindingChartForMonth(reports);
      }
    }, (error) => {
      console.log(error);
    });
  }

  bindingChartForMonth(reports: any[]) {
  }

  bindingChartForDate(reports: any[]) {
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }
}
