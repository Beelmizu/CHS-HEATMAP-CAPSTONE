import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreComponent } from './store.component';
import { ZoneComponent } from '../zone/zone.component';
import { CameraComponent } from '../camera/camera.component';
import { CameraDetailComponent } from '../camera-detail/camera-detail.component';


const routes: Routes = [
  {
    path: '',
    component: StoreComponent,
    data: {
      title: 'Store'
    }
  },
  {
    path: ':storeID/zone',
    component: ZoneComponent,
    data: {
      title: 'Zone'
    }
  },
  {
    path: ':storeID/zone/:zoneID/camera',
    component: CameraComponent,
    data: {
      title: 'Camera'
    }
  },
  {
    path: ':storeID/zone/:zoneID/camera/:cameraID/detail',
    component: CameraDetailComponent,
    data: {
      title: 'Camera Detail'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule {}
