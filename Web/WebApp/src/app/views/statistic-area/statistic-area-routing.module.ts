import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatisticAreaComponent } from './statistic-area.component';


const routes: Routes = [
  {
    path: '',
    component: StatisticAreaComponent,
    data: {
      title: 'Statistic Area Detail'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatisticAreaRoutingModule {}
