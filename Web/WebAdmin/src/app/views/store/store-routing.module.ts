import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreComponent } from './store.component';
import { StoreDetailComponent } from '../store-detail/store-detail.component';


const routes: Routes = [
  {
    path: '',
    component: StoreComponent,
    data: {
      title: 'Store'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule {}
