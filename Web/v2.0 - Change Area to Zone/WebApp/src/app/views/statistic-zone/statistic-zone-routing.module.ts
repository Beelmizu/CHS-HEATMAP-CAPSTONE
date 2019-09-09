import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatisticZoneComponent } from './statistic-zone.component';


const routes: Routes = [
  {
    path: '',
    component: StatisticZoneComponent,
    data: {
      title: 'Statistic Zone Detail'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatisticZoneRoutingModule {}
