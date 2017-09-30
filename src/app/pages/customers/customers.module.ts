import { NgModule } from '@angular/core';
import { SharedModule } from './../../shared/shared.module';

import { routing } from './customers.routing';
import { Customers } from './customers.component';
import { CustomersList } from './components/list/customers.component';
import { CustomersForm } from './components/form/customers.form.component';
import { CustomersService } from './customers.service';

@NgModule({
  imports: [
    routing,
    SharedModule
  ],
  declarations: [
    Customers,    
    CustomersList,
    CustomersForm,
  ],
  providers: [
    CustomersService,
  ]
})
export class CustomersModule {
}
