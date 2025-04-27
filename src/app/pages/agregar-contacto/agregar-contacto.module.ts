import { NgModule } from '@angular/core';
import { AgregarContactoPageRoutingModule } from './agregar-contacto-routing.module';
import { AgregarContactoPage } from './agregar-contacto.page';

import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    AgregarContactoPageRoutingModule
  ],
  declarations: [AgregarContactoPage]
})
export class AgregarContactoPageModule {}
