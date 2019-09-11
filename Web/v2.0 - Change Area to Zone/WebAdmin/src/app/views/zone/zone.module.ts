import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxPaginationModule} from 'ngx-pagination';
import { NgModel } from '@angular/forms/src/directives/ng_model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap';
import { ZoneRoutingModule } from './zone-routing.module';
import { ZoneComponent } from './zone.component';
import { ZoneService } from '../../services/zone.service';


@NgModule({
  imports: [
    ZoneRoutingModule,
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot()
  ],
  declarations: [ ZoneComponent ],
  providers: [ ZoneService ]
})
export class ZoneModule { }
