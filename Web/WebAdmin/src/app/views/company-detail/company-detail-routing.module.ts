import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyDetailComponent } from './company-detail.component';


const routes: Routes = [
  {
    path: '',
    component: CompanyDetailComponent,
    data: {
      title: 'Company Detail'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyDetailRoutingModule {}
