import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { DataTableModule } from "angular2-datatable";
import { HttpModule } from "@angular/http";
import { HotTable, HotTableModule } from 'ng2-handsontable';

import { routing } from './products.routing';
import { Products } from './products.component';
import { ProductsList } from './components/list/products.component';
import { ProductsForm } from './components/form/products.form.component';
import { ProductsService } from './products.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing,
    Ng2SmartTableModule,
    DataTableModule,
    HttpModule,
    HotTableModule
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
