import { Routes, RouterModule }  from '@angular/router';
import { Pages } from './pages.component';
import { ModuleWithProviders } from '@angular/core';

import { AuthGuard } from '../shared/auth.guard';
// noinspection TypeScriptValidateTypes

// export function loadChildren(path) { return System.import(path); };

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: 'app/pages/login/login.module#LoginModule'
  },
  {
    path: 'pages',
    component: Pages,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
      { path: 'products', loadChildren: './products/products.module#ProductsModule' },
      { path: 'sales', loadChildren: './sales/sales.module#SalesModule' },
      { path: 'activities', loadChildren: './activities/activities.module#ActivitiesModule' },
      { path: 'customers', loadChildren: './customers/customers.module#CustomersModule' },
      { path: 'profiles', loadChildren: './profiles/profiles.module#ProfilesModule' },
    ], canActivate: [AuthGuard]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
