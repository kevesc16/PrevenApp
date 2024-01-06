import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InspeccionesPageRoutingModule } from './inspecciones-routing.module';

import { InspeccionesPage } from './inspecciones.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InspeccionesPageRoutingModule
  ],
  declarations: [InspeccionesPage]
})
export class InspeccionesPageModule {}
