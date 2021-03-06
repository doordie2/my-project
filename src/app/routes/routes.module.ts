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
import { DataComponent } from './data/data.component';
import { KfComponent } from './kf/kf.component';
import { DelonAuthModule, JWTInterceptor } from '@delon/auth';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AccountComponent } from './account/account.component';
import { ComtextComponent } from './comtext/comtext.component';
import { ComtextModalComponent } from './comtext/comtext.modal.component';
import { GroupComponent } from './group/group.component';
import { KfModalComponent } from './kf/kf.modal.component';
import { AllDataComponent } from './allData/allData.component';
import { PersonalRoutingModule } from './personal/personal-routing.module';
import { ViserModule } from 'viser-ng';
import { FriendCircleComponent } from './friendCircle/friendCircle/friendCircle.component';
import { NgxDnDModule } from '@swimlane/ngx-dnd';
import { Ng2DragDropModule } from 'ng2-drag-drop';


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
  DataComponent,
  KfComponent,
  AccountComponent,
  ComtextComponent,
  ComtextModalComponent,
  GroupComponent,
  KfModalComponent,
  AllDataComponent

];
const COMPONENTS_NOROUNT = [ComtextModalComponent,KfModalComponent];

@NgModule({
  imports: [ SharedModule, RouteRoutingModule,DelonAuthModule.forRoot(),ViserModule,NgxDnDModule],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT,
  providers:[// 相应的HTTP拦截器
    { provide: HTTP_INTERCEPTORS, useClass: JWTInterceptor, multi: true}]

})
export class RoutesModule {}
