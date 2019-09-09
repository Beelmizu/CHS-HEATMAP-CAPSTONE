import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckCameraComponent } from './check-camera.component';


const routes: Routes = [
  {
    path: '',
    component: CheckCameraComponent,
    data: {
      title: 'Check Camera'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckCameraRoutingModule {}
