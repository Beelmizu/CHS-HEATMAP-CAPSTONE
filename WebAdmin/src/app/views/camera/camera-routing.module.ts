import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CameraComponent } from './camera.component';
import { CameraLiveComponent } from '../camera-live/camera-live.component';
import { HeatmapComponent } from '../heatmap/heatmap.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Camera'
    },
    children: [
      {
        path: 'live',
        component: CameraLiveComponent,
        data: {
          title: 'Live Preview'
        }
      },
      {
        path: 'heatmap',
        component: HeatmapComponent,
        data: {
          title: 'Heatmap'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CameraRoutingModule {}
