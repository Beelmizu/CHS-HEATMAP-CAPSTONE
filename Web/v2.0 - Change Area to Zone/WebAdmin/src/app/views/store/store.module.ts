import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxPaginationModule} from 'ngx-pagination';
import { NgModel } from '@angular/forms/src/directives/ng_model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap';
import { CompanyDetailService } from '../../services/company-detail.service';
import { StoreComponent } from './store.component';
import { StoreService } from '../../services/store.service';
import { StoreDetailComponent } from '../store-detail/store-detail.component';
import { StoreRoutingModule } from './store-routing.module';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [
    RouterModule,
    StoreRoutingModule,
    CommonModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot()
  ],
  declarations: [ StoreComponent, StoreDetailComponent],
  providers: [ StoreService ]
})
export class StoreModule {}
