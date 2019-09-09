import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AreaDetailComponent } from './area-detail.component';


const routes: Routes = [
  {
    path: '',
    component: AreaDetailComponent,
    data: {
      title: 'Area Detail'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AreaDetailRoutingModule {}
