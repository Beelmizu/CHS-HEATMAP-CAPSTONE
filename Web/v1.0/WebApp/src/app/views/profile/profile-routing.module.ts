import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatisticComponent } from '../statistic/statistic.component';
import { ProfileComponent } from './profile.component';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { ChangePasswordComponent } from '../change-password/change-password.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Profile'
    },
    children: [
      {
        path: 'edit',
        component: EditProfileComponent,
        data: {
          title: 'Edit Profile'
        }
      },
      {
        path: 'changepassword',
        component: ChangePasswordComponent,
        data: {
          title: 'Change Password'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {}
