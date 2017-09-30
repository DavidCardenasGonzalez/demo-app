import { Routes, RouterModule } from '@angular/router';

import { Customers } from './customers.component';
import { CustomersList } from './components/list/customers.component';
import { CustomersForm } from './components/form/customers.form.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Customers,
    children: [
      { path: '', component: CustomersList },
      { path: 'add', component: CustomersForm },
      { path: ':id', component: CustomersForm },
    ]
  }
];

export const routing = RouterModule.forChild(routes);
