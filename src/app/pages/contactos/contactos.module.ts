import { NgModule } from '@angular/core';
import { ContactosPageRoutingModule } from './contactos-routing.module';
import { ContactosPage } from './contactos.page';

import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    ContactosPageRoutingModule
  ],
  declarations: [ContactosPage]
})
export class ContactosPageModule {}
