import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatisticStoreComponent } from './statistic-store.component';


const routes: Routes = [
  {
    path: '',
    component: StatisticStoreComponent,
    data: {
      title: 'Statistic Store Detail'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatisticStoreRoutingModule {}
