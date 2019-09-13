import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatisticStoreComponent } from '../statistic-store/statistic-store.component';
import { StatisticZoneComponent } from '../statistic-zone/statistic-zone.component';
import { StatisticCameraComponent } from '../statistic-camera/statistic-camera.component';
import { StatisticTrafficComponent } from '../statistic-traffic/statistic-traffic.component';
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
        path: 'zone',
        component: StatisticZoneComponent,
        data: {
          title: 'Zone'
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
        path: 'traffic',
        component: StatisticTrafficComponent,
        data: {
          title: 'Trafic'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatisticRoutingModule {}
