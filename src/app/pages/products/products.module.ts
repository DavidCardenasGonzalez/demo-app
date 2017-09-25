import { NgModule } from '@angular/core';
import { SharedModule } from './../../shared/shared.module';

import { routing } from './products.routing';
import { Products } from './products.component';
import { ProductsList } from './components/list/products.component';
import { ProductsForm } from './components/form/products.form.component';
import { ProductsService } from './products.service';

@NgModule({
  imports: [
    routing,
    SharedModule
  ],
  declarations: [
    Products,    
    ProductsList,
    ProductsForm,
  ],
  providers: [
    ProductsService,
  ]
})
export class ProductsModule {
}
