import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeatmapComponent } from './heatmap.component';


const routes: Routes = [
  {
    path: '',
    component: HeatmapComponent,
    data: {
      title: 'Heatmap'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeatmapRoutingModule {}
