import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import {
  FriendCircleRoutingModule,
} from './friendCircle-routing.module';
import { FriendComponent } from './friend/friend.component';
import { FriendCircleComponent } from './friendCircle/friendCircle.component';
import { DevicePlanComponent } from './devicePlan/devicePlan.component';
import { SendInfoComponent } from './sendInfo/sendInfo.component';

const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [SharedModule, FriendCircleRoutingModule],
  declarations: [
    FriendComponent,
    FriendCircleComponent,
    DevicePlanComponent,
    SendInfoComponent,
    ...COMPONENTS_NOROUNT,
  ],
  entryComponents: COMPONENTS_NOROUNT,
})
export class FriendCircleModule {}
