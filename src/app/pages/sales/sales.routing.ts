import { Routes, RouterModule } from '@angular/router';

import { Sales } from './sales.component';
import { SalesList } from './components/list/sales.component';
import { SalesForm } from './components/form/sales.form.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Sales,
    children: [
      { path: '', component: SalesList },
      { path: 'add', component: SalesForm },
      { path: ':id', component: SalesForm },
    ]
  }
];

export const routing = RouterModule.forChild(routes);
