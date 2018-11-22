import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { RouteRoutingModule } from './routes-routing.module';
// dashboard pages
import { DashboardComponent } from './dashboard/dashboard.component';
// passport pages
import { UserLoginComponent } from './passport/login/login.component';
import { UserRegisterComponent } from './passport/register/register.component';
import { UserRegisterResultComponent } from './passport/register-result/register-result.component';
// single pages
import { CallbackComponent } from './callback/callback.component';
import { UserLockComponent } from './passport/lock/lock.component';
import { Exception403Component } from './exception/403.component';
import { Exception404Component } from './exception/404.component';
import { Exception500Component } from './exception/500.component';
import { SysComponent } from './sys/sys.component';
import { SytComponent } from './syt/syt.component';
import { SyuComponent } from './syu/syu.component';
import { DelonAuthModule, JWTInterceptor } from '@delon/auth';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SyvComponent } from './syv/syv.component';


const COMPONENTS = [
  DashboardComponent,
  // passport pages
  UserLoginComponent,
  UserRegisterComponent,
  UserRegisterResultComponent,
  // single pages
  CallbackComponent,
  UserLockComponent,
  Exception403Component,
  Exception404Component,
  Exception500Component,
  SysComponent,
  SytComponent,
  SyuComponent,
  SyvComponent,
];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [ SharedModule, RouteRoutingModule,DelonAuthModule.forRoot() ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT,
  providers:[// 相应的HTTP拦截器
    { provide: HTTP_INTERCEPTORS, useClass: JWTInterceptor, multi: true}]

})
export class RoutesModule {}
