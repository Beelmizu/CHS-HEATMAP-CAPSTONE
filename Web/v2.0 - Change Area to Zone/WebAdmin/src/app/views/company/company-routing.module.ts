import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyComponent } from './company.component';
import { CompanyDetailComponent } from '../company-detail/company-detail.component';
import { StoreComponent } from '../store/store.component';
import { StoreDetailComponent } from '../store-detail/store-detail.component';
import { ZoneComponent } from '../zone/zone.component';
import { ZoneDetailComponent } from '../zone-detail/zone-detail.component';
import { CameraComponent } from '../camera/camera.component';
import { CameraDetailComponent } from '../camera-detail/camera-detail.component';
import { AccountComponent } from '../account/account.component';
import { AccountDetailComponent } from '../account-detail/account-detail.component';


const routes: Routes = [
  {
    path: '',
    component: CompanyComponent,
    data: {
      title: 'Company'
    }
  },
  {
    path: ':mode/:idCompany',
    component: CompanyDetailComponent,
    data: {
      title: 'Company Detail'
    }
  },
  {
    path: ':mode',
    component: CompanyDetailComponent,
    data: {
      title: 'Add Company'
    }
  },
  {
    path: ':idCompany/all/account',
    component: AccountComponent,
    data: {
      title: 'Account'
    }
  },
  {
    path: ':idCompany/all/account/:mode/:idAccount',
    component: AccountDetailComponent,
    data: {
      title: 'Account Detail'
    }
  },
  {
    path: ':idCompany/all/account/:mode',
    component: AccountDetailComponent,
    data: {
      title: 'Add Account'
    }
  },
  {
    path: ':idCompany/all/store',
    component: StoreComponent,
    data: {
      title: 'Store'
    }
  }, // way of view Store
  {
    path: ':idCompany/all/store/:mode/:idStore',
    component: StoreDetailComponent,
    data: {
      title: 'Store Detail'
    }
  },
  {
    path: ':idCompany/all/store/:mode',
    component: StoreDetailComponent,
    data: {
      title: 'Add Store'
    }
  },
  {
    path: ':idCompany/all/store/:idStore/all/zone',
    component: ZoneComponent,
    data: {
      title: 'Zone'
    }
  },
  {
    path: ':idCompany/all/store/:idStore/all/account',
    component: AccountComponent,
    data: {
      title: 'Account'
    }
  },
  {
    path: ':idCompany/all/store/:idStore/all/account/:mode/:idAccount',
    component: AccountDetailComponent,
    data: {
      title: 'Account Detail'
    }
  },
  {
    path: ':idCompany/all/store/:idStore/all/account/:mode',
    component: AccountDetailComponent,
    data: {
      title: 'Add Account'
    }
  },
  {
    path: ':idCompany/all/store/:idStore/all/zone/:mode/:idZone',
    component: ZoneDetailComponent,
    data: {
      title: 'Zone Detail'
    }
  },
  {
    path: ':idCompany/all/store/:idStore/all/zone/:mode',
    component: ZoneDetailComponent,
    data: {
      title: 'Add Zone'
    }
  },
  {
    path: ':idCompany/all/store/:idStore/all/zone/:idZone/all/camera',
    component: CameraComponent,
    data: {
      title: 'Camera'
    }
  },
  {
    path: ':idCompany/all/store/:idStore/all/zone/:idZone/all/camera/:mode/:idCamera',
    component: CameraDetailComponent,
    data: {
      title: 'Camera Detail'
    }
  },
  {
    path: ':idCompany/all/store/:idStore/all/zone/:idZone/all/camera/:mode',
    component: CameraDetailComponent,
    data: {
      title: 'Add Camera'
    }
  }, // way of view Account
  {
    path: ':idCompany/all/account/:idAccount/all/store',
    component: StoreComponent,
    data: {
      title: 'Store'
    }
  },
  {
    path: ':idCompany/all/account/:idAccount/all/store/:mode/:idStore',
    component: StoreDetailComponent,
    data: {
      title: 'Store Detail'
    }
  },
  {
    path: ':idCompany/all/account/:idAccount/all/store/:mode',
    component: StoreDetailComponent,
    data: {
      title: 'Add Store'
    }
  },
  {
    path: ':idCompany/all/account/:idAccount/all/store/:idStore/all/zone',
    component: ZoneComponent,
    data: {
      title: 'Zone'
    }
  },
  {
    path: ':idCompany/all/account/:idAccount/all/store/:idStore/all/zone/:mode/:idZone',
    component: ZoneDetailComponent,
    data: {
      title: 'Zone Detail'
    }
  },
  {
    path: ':idCompany/all/account/:idAccount/all/store/:idStore/all/zone/:mode',
    component: ZoneDetailComponent,
    data: {
      title: 'Add Zone'
    }
  },
  {
    path: ':idCompany/all/account/:idAccount/all/store/:idStore/all/zone/:idZone/all/camera',
    component: CameraComponent,
    data: {
      title: 'Camera'
    }
  },
  {
    path: ':idCompany/all/account/:idAccount/all/store/:idStore/all/zone/:idZone/all/camera/:mode/:idCamera',
    component: CameraDetailComponent,
    data: {
      title: 'Camera Detail'
    }
  },
  {
    path: ':idCompany/all/account/:idAccount/all/store/:idStore/all/zone/:idZone/all/camera/:mode',
    component: CameraDetailComponent,
    data: {
      title: 'Add Camera'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule {}
