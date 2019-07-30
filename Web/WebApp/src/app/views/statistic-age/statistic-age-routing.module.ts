import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatisticAgeComponent } from './statistic-age.component';


const routes: Routes = [
  {
    path: '',
    component: StatisticAgeComponent,
    data: {
      title: 'Statistic Age Detail'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatisticAgeRoutingModule {}
