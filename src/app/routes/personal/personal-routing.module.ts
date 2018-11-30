import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonalComponent } from './center/personal.component';
import { ProAccountSettingsComponent } from './settings/settings.component';
import { StepFormComponent } from './step-form/step-form.component';

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
            component: PersonalComponent,
            data: { titleI18n: 'pro-account-settings' },
          },
          {
            path: 'cash',
            component: StepFormComponent,
            data: { titleI18n: 'pro-account-settings' },
          },
          {
            path: 'binding',
            component: PersonalComponent,
            data: { titleI18n: 'pro-account-settings' },
          },
          {
            path: 'notification',
            component: PersonalComponent,
            data: { titleI18n: 'pro-account-settings' },
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
