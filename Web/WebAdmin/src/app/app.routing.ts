import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { RegisterComponent } from './views/register/register.component';
import { AuthGuard } from './views/_guards';
import { LoginComponent } from './views/login/login.component';
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'company',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'profile',
        loadChildren: './views/profile/profile.module#ProfileModule'
      },
      {
        path: 'company',
        loadChildren: './views/company/company.module#CompanyModule'
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
