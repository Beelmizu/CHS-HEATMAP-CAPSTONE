import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ZoneComponent } from './zone.component';


const routes: Routes = [
  {
    path: '',
    component: ZoneComponent,
    data: {
      title: 'Zone'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ZoneRoutingModule {}
