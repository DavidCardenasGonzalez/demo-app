import { Routes, RouterModule } from '@angular/router';

import { Products } from './products.component';
import { ProductsList } from './components/list/products.component';
import { ProductsForm } from './components/form/products.form.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Products,
    children: [
      { path: '', component: ProductsList },
      { path: 'add', component: ProductsForm },
      { path: ':id', component: ProductsForm },
    ]
  }
];

export const routing = RouterModule.forChild(routes);
