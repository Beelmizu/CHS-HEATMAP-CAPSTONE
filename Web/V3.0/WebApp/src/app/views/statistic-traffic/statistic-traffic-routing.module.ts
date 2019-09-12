import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatisticTrafficComponent } from './statistic-traffic.component';


const routes: Routes = [
  {
    path: '',
    component: StatisticTrafficComponent,
    data: {
      title: 'Statistic Traffic Detail'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatisticTrafficRoutingModule {}
