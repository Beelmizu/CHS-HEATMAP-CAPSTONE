import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ZoneDetailComponent } from './zone-detail.component';


const routes: Routes = [
  {
    path: '',
    component: ZoneDetailComponent,
    data: {
      title: 'Zone Detail'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ZoneDetailRoutingModule {}
