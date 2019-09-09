import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountDetailComponent } from './account-detail.component';


const routes: Routes = [
  {
    path: '',
    component: AccountDetailComponent,
    data: {
      title: 'Account Detail'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountDetailRoutingModule {}
