import { NgModule, ModuleWithProviders  } from '@angular/core';
import { NgbDropdownModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from "@angular/http";
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../theme/nga.module';


@NgModule({
    imports: [
      NgaModule,
      CommonModule,
      FormsModule,
      NgbDropdownModule,
      NgbModalModule, 
      HttpModule,
      Ng2SmartTableModule
    ],
    exports: [
      NgaModule,
      CommonModule,
      FormsModule,
      NgbDropdownModule,
      NgbModalModule, 
      HttpModule,
      Ng2SmartTableModule
    ],
    declarations: [],
    providers: [],
})
export class SharedModule { 

}
