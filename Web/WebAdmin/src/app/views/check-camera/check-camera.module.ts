import { NgModule } from '@angular/core';
import { SocketConnectService } from '../../services/socket-connect.service';

import { CommonModule } from '@angular/common';
import {NgxPaginationModule} from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule, CollapseModule } from 'ngx-bootstrap';
import { CheckCameraRoutingModule } from './check-camera-routing.module';
import { CheckCameraComponent } from './check-camera.component';
import { DataTableModule } from 'angular-6-datatable';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FilterPipeModule } from 'ngx-filter-pipe';

@NgModule({
  imports: [
    CheckCameraRoutingModule,
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    CollapseModule,
    Ng2SearchPipeModule,
    BsDropdownModule.forRoot(),
    DataTableModule,
    FilterPipeModule
  ],
  declarations: [ CheckCameraComponent ],
  providers: [ SocketConnectService ]
})
export class CheckCameraModule { }
