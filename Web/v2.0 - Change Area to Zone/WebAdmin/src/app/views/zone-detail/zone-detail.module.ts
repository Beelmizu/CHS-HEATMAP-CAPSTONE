import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxPaginationModule} from 'ngx-pagination';
import { NgModel } from '@angular/forms/src/directives/ng_model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap';
import { StoreDetailService } from '../../services/store-detail.service';
import { ZoneDetailComponent } from './zone-detail.component';
import { ZoneDetailService } from '../../services/zone-detail.service';


@NgModule({
  imports: [
    CommonModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot()
  ],
  declarations: [ ZoneDetailComponent ],
  providers: [ ZoneDetailService ]
})
export class ZoneDetailModule { }
