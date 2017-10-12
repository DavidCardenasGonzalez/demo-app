import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import { routing }       from './pages.routing';
import { NgaModule } from '../theme/nga.module';
import { AppTranslationModule } from '../app.translation.module';

import { Pages } from './pages.component';

import { NgbTimepicker, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { DefaultModal } from '../shared/modals/default-modal/default-modal.component';
import { ActivityModal } from '../shared/modals/activity-modal/activity-modal.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, AppTranslationModule, NgaModule, FormsModule, NgbModule.forRoot(), routing],
  declarations: [Pages,DefaultModal,ActivityModal],
  entryComponents: [
    DefaultModal,
    ActivityModal
  ],
})
export class PagesModule {
}
