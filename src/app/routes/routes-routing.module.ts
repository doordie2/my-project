import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '@env/environment';
// layout
import { LayoutDefaultComponent } from '../layout/default/default.component';
import { LayoutPassportComponent } from '../layout/passport/passport.component';
// dashboard pages
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
import { AccountComponent } from './account/account.component';
import { JWTGuard, SimpleGuard } from '@delon/auth';
import { ComtextComponent } from './comtext/comtext.component';
import { GroupComponent } from './group/group.component';
import { AllDataComponent } from './allData/allData.component';
import { FriendCircleComponent } from './friendCircle/friendCircle.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutDefaultComponent,
    children: [
      { path: '', redirectTo: 'allData', pathMatch: 'full' },
      { path: 'allData', component: AllDataComponent,canActivate: [JWTGuard ],data: { title: '总量统计', titleI18n: '总量统计'} },
      { path: 'data', component: DataComponent,canActivate: [JWTGuard ],data: { title: '客服统计', titleI18n: '客服统计'} },
      { path: 'kf', component: KfComponent, canActivate: [JWTGuard ],data: { title: '客服管理', titleI18n: '客服管理' } },
      { path: 'account', component: AccountComponent, canActivate: [SimpleGuard ],data: { title: '账号管理', titleI18n: '账号管理' } },
      { path: 'comtext', component: ComtextComponent, canActivate: [SimpleGuard ],data: { title: '快捷语', titleI18n: '快捷语' } },
      { path: 'group', component: GroupComponent, canActivate: [SimpleGuard ],data: { title: '群发助手', titleI18n: '群发助手' } },
      { path: 'personal', loadChildren: './personal/personal.module#PersonalModule' },
      { path: 'send', component: FriendCircleComponent, canActivate: [SimpleGuard ],data: { title: '发送朋友圈', titleI18n: '发送朋友圈' } },
      // 业务子模块
      // { path: 'widgets', loadChildren: './widgets/widgets.module#WidgetsModule' }
    ]
  },
  // 全屏布局
  // {
  //     path: 'fullscreen',
  //     component: LayoutFullScreenComponent,
  //     children: [
  //     ]
  // },
  // passport
  {
    path: 'passport',
    component: LayoutPassportComponent,
    children: [
      { path: 'login', component: UserLoginComponent, data: { title: '登录', titleI18n: 'pro-login' } },
      { path: 'register', component: UserRegisterComponent, data: { title: '注册', titleI18n: 'pro-register' } },
      { path: 'register-result', component: UserRegisterResultComponent, data: { title: '注册结果', titleI18n: 'pro-register-result' } }
    ]
  },
  // 单页不包裹Layout
  { path: 'callback/:type', component: CallbackComponent },
  { path: 'lock', component: UserLockComponent, data: { title: '锁屏', titleI18n: 'lock' } },
  { path: '403', component: Exception403Component },
  { path: '404', component: Exception404Component },
  { path: '500', component: Exception500Component },
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: environment.useHash })],
  exports: [RouterModule]
})
export class RouteRoutingModule { }
