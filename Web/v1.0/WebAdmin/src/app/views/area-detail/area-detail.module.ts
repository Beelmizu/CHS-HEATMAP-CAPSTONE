import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxPaginationModule} from 'ngx-pagination';
import { NgModel } from '@angular/forms/src/directives/ng_model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap';
import { StoreDetailService } from '../../services/store-detail.service';
import { AreaDetailComponent } from './area-detail.component';
import { AreaDetailService } from '../../services/area-detail.service';


@NgModule({
  imports: [
    CommonModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot()
  ],
  declarations: [ AreaDetailComponent ],
  providers: [ AreaDetailService ]
})
export class AreaDetailModule { }
