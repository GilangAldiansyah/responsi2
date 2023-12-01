import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TamuPage } from './tamu.page';

const routes: Routes = [
  {
    path: '',
    component: TamuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TamuPageRoutingModule {}
