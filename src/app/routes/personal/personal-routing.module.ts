import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RechargeRecordComponent } from './rechargeRecord/rechargeRecord.component';
import { ProAccountSettingsComponent } from './settings/settings.component';
import { RechargeComponent } from './recharge/recharge.component';
import { RechargeSuccessComponent } from './rechargeSuccess/rechargeSuccess.component';

const routes: Routes = [
  {
    path: 'center',
    children: [
      {
        path: 'settings',
        component: ProAccountSettingsComponent,
        children: [
          { path: '', redirectTo: 'base', pathMatch: 'full' },
          {
            path: 'base',
            component: RechargeRecordComponent,
            data: { title: '个人中心', titleI18n: '个人中心' }
          },
          {
            path: 'recharge',
            component: RechargeComponent,
            data: { title: '充值', titleI18n: '充值' }
          },
          {
            path: 'rechargeRecord',
            component: RechargeRecordComponent,
            data: { title: '充值记录', titleI18n: '充值记录' }
          },{
            path: 'rechargeSuccess',
            component: RechargeSuccessComponent,
            data: { title: '充值成功', titleI18n: '充值成功' }
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonalRoutingModule {}
