import { NgModule } from '@angular/core';
import { SharedModule } from './../../shared/shared.module';

import { routing } from './sales.routing';
import { Sales } from './sales.component';
import { SalesList } from './components/list/sales.component';
import { SalesForm } from './components/form/sales.form.component';
import { SalesService } from './sales.service';

@NgModule({
  imports: [
    routing,
    SharedModule
  ],
  declarations: [
    Sales,    
    SalesList,
    SalesForm,
  ],
  providers: [
    SalesService,
  ]
})
export class SalesModule {
}
