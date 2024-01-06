import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InspeccionesPage } from './inspecciones.page';

const routes: Routes = [
  {
    path: '',
    component: InspeccionesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InspeccionesPageRoutingModule {}
