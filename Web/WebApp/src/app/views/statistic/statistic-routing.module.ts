import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatisticStoreComponent } from '../statistic-store/statistic-store.component';
import { StatisticAreaComponent } from '../statistic-area/statistic-area.component';
import { StatisticCameraComponent } from '../statistic-camera/statistic-camera.component';
import { StatisticAgeComponent } from '../statistic-age/statistic-age.component';
import { StatisticGenderComponent } from '../statistic-gender/statistic-gender.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Statistic'
    },
    children: [
      {
        path: 'store',
        component: StatisticStoreComponent,
        data: {
          title: 'Store'
        }
      },
      {
        path: 'area',
        component: StatisticAreaComponent,
        data: {
          title: 'Area'
        }
      },
      {
        path: 'camera',
        component: StatisticCameraComponent,
        data: {
          title: 'Camera'
        }
      },
      {
        path: 'age',
        component: StatisticAgeComponent,
        data: {
          title: 'Customer Age'
        }
      },
      {
        path: 'gender',
        component: StatisticGenderComponent,
        data: {
          title: 'Customer Gender'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatisticRoutingModule {}
