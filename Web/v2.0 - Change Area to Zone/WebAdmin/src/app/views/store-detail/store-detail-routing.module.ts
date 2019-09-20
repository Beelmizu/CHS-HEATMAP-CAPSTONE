import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreDetailComponent } from './store-detail.component';


const routes: Routes = [
  {
    path: '',
    component: StoreDetailComponent,
    data: {
      title: 'Store Detail'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreDetailRoutingModule {}
