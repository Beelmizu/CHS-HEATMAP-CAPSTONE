import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxPaginationModule} from 'ngx-pagination';
import { NgModel } from '@angular/forms/src/directives/ng_model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap';
import { AreaRoutingModule } from './area-routing.module';
import { AreaComponent } from './area.component';
import { AreaService } from '../../services/area.service';


@NgModule({
  imports: [
    AreaRoutingModule,
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot()
  ],
  declarations: [ AreaComponent ],
  providers: [ AreaService ]
})
export class AreaModule { }
