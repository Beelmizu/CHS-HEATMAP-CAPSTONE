import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatisticCameraComponent } from './statistic-camera.component';


const routes: Routes = [
  {
    path: '',
    component: StatisticCameraComponent,
    data: {
      title: 'Statistic Camera Detail'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatisticCameraRoutingModule {}
