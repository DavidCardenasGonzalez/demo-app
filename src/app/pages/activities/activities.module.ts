import { NgModule } from '@angular/core';
import { SharedModule } from './../../shared/shared.module';

import { routing } from './activities.routing';
import { Activities } from './activities.component';
import { ActivitiesList } from './components/list/activities.component';
import { ActivitiesForm } from './components/form/activities.form.component';
import { ActivitiesService } from './activities.service';
import { CalendarModule } from 'angular-calendar';

@NgModule({
  imports: [
    routing,
    SharedModule,
    CalendarModule.forRoot(),     
  ],
  declarations: [
    Activities,    
    ActivitiesList,
    ActivitiesForm,
  ],
  providers: [
    ActivitiesService,
  ]
})
export class ActivitiesModule {
}
