import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { PersonalRoutingModule } from './personal-routing.module';
import { RechargeRecordComponent } from './rechargeRecord/rechargeRecord.component';
import { ProAccountSettingsComponent } from './settings/settings.component';
import { RechargeComponent } from './recharge/recharge.component';
import { PersonalInfoComponent } from './personalInfo/personalInfo.component';
import { RechargeSuccessComponent } from './rechargeSuccess/rechargeSuccess.component';

const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [SharedModule, PersonalRoutingModule],
  declarations: [
    RechargeRecordComponent,
    ProAccountSettingsComponent,
    RechargeComponent,
    PersonalInfoComponent,
    RechargeSuccessComponent,
    ...COMPONENTS_NOROUNT,
  ],
  entryComponents: COMPONENTS_NOROUNT,
})
export class PersonalModule {}
