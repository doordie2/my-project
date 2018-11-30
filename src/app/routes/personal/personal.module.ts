import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { PersonalRoutingModule } from './personal-routing.module';
import { PersonalComponent } from './center/personal.component';
import { ProAccountSettingsComponent } from './settings/settings.component';
import { Step1Component } from './step-form/step1.component';
import { Step2Component } from './step-form/step2.component';
import { Step3Component } from './step-form/step3.component';
import { StepFormComponent } from './step-form/step-form.component';

const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [SharedModule, PersonalRoutingModule],
  declarations: [
    PersonalComponent,
    ProAccountSettingsComponent,
    Step1Component,
    Step2Component,
    Step3Component,
    StepFormComponent,
    ...COMPONENTS_NOROUNT,
  ],
  entryComponents: COMPONENTS_NOROUNT,
})
export class PersonalModule {}
