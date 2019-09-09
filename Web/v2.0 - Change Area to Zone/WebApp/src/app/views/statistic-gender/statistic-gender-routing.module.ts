import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatisticGenderComponent } from './statistic-gender.component';


const routes: Routes = [
  {
    path: '',
    component: StatisticGenderComponent,
    data: {
      title: 'Statistic Gender Detail'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatisticGenderRoutingModule {}
