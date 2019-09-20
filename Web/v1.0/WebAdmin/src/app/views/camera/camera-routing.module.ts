import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CameraComponent } from './camera.component';


const routes: Routes = [
  {
    path: '',
    component: CameraComponent,
    data: {
      title: 'Camera'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CameraRoutingModule {}
