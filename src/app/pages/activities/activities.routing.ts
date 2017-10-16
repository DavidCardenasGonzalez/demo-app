import { Routes, RouterModule } from '@angular/router';

import { Activities } from './activities.component';
import { ActivitiesList } from './components/list/activities.component';
import { ActivitiesForm } from './components/form/activities.form.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Activities,
    children: [
      { path: '', component: ActivitiesList },
      { path: 'add', component: ActivitiesForm },
      { path: ':id', component: ActivitiesForm },
    ]
  }
];

export const routing = RouterModule.forChild(routes);
