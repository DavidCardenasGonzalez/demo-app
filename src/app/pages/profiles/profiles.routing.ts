import { Routes, RouterModule } from '@angular/router';

import { Profiles } from './profiles.component';
import { ProfilesList } from './components/list/profiles.component';
import { ProfilesForm } from './components/form/profiles.form.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Profiles,
    children: [
      { path: '', component: ProfilesList },
      { path: 'add', component: ProfilesForm },
      { path: ':id', component: ProfilesForm },
    ]
  }
];

export const routing = RouterModule.forChild(routes);
