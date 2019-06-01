import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatisticComponent } from './statistic.component';


const routes: Routes = [
  {
    path: '',
    component: StatisticComponent,
    data: {
      title: 'Statistic'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatisticRoutingModule {}
