import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';

// Import containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';

const APP_CONTAINERS = [
  DefaultLayoutComponent
];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '../../node_modules/@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { NgxPasswordToggleModule } from 'ngx-password-toggle';
import { ToastrModule } from 'ngx-toastr';
import {MatDialogModule} from '@angular/material';
import { StatisticDialogComponent } from './views/statistic-dialog/statistic-dialog.component';
import { ViewHeatmapDialogComponent } from './views/view-heatmap-dialog/view-heatmap-dialog.component';
import { ViewHeatmapDialogAreaComponent } from './views/view-heatmap-dialog-area/view-heatmap-dialog-area.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from 'angularfire2/storage';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  imports: [
    ChartsModule,
    BrowserModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    NgbModule.forRoot(),
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    ReactiveFormsModule,
    NgxPasswordToggleModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    MatDialogModule,
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyABNUKB1bjzhKg6zui90wlK0OU0j8eUzDE',
      authDomain: 'heatmapsystem.firebaseapp.com',
      storageBucket: 'heatmapsystem.appspot.com',
      projectId: 'heatmapsystem',
    }),
    AngularFireStorageModule
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    P404Component,
    P500Component,
    LoginComponent,
    RegisterComponent,
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
