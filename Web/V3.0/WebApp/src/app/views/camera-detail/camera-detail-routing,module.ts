import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CameraDetailComponent } from './camera-detail.component';


const routes: Routes = [
  {
    path: '',
    component: CameraDetailComponent,
    data: {
      title: 'Camera Detail'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CameraDetailRoutingModule {}
