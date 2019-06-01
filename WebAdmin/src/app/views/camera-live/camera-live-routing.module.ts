import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CameraLiveComponent } from './camera-live.component';


const routes: Routes = [
  {
    path: '',
    component: CameraLiveComponent,
    data: {
      title: 'Live Preview'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CameraLiveRoutingModule {}
