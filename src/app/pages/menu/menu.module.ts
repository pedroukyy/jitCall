import { NgModule } from '@angular/core';
import { MenuPageRoutingModule } from './menu-routing.module';
import { MenuPage } from './menu.page';

import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    MenuPageRoutingModule
  ],
  declarations: [MenuPage]
})
export class MenuPageModule {}
