import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreComponent } from './store.component';
import { AreaComponent } from '../area/area.component';
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
    path: ':storeID/area',
    component: AreaComponent,
    data: {
      title: 'Area'
    }
  },
  {
    path: ':storeID/area/:areaID/camera',
    component: CameraComponent,
    data: {
      title: 'Camera'
    }
  },
  {
    path: ':storeID/area/:areaID/camera/:cameraID/detail',
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
