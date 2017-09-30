import { NgModule } from '@angular/core';
import { SharedModule } from './../../shared/shared.module';

import { routing } from './profiles.routing';
import { Profiles } from './profiles.component';
import { ProfilesList } from './components/list/profiles.component';
import { ProfilesForm } from './components/form/profiles.form.component';
import { ProfilesService } from './profiles.service';

@NgModule({
  imports: [
    routing,
    SharedModule
  ],
  declarations: [
    Profiles,    
    ProfilesList,
    ProfilesForm,
  ],
  providers: [
    ProfilesService,
  ]
})
export class ProfilesModule {
}
