import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FriendCircleComponent } from './friendCircle/friendCircle.component';
import { FriendComponent } from './friend/friend.component';
import { DevicePlanComponent } from './devicePlan/devicePlan.component';
import { SendInfoComponent } from './sendInfo/sendInfo.component';

const routes: Routes = [
  {
    path: 'center',
    children: [
      {
        path: 'setting',
        component: FriendComponent,
        children: [
          { path: '', redirectTo: 'base', pathMatch: 'full' },
          {
            path: 'base',
            component: FriendCircleComponent,
            data: { title: '发送朋友圈', titleI18n: '发送朋友圈' }
          },
          {
            path: 'devicePlan',
            component: DevicePlanComponent,
            data: { title: '设备方案', titleI18n: '设备方案' }
          },
          {
            path: 'sendInfo',
            component: SendInfoComponent,
            data: { title: '发送详情', titleI18n: '发送详情' }
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
export class FriendCircleRoutingModule {}
