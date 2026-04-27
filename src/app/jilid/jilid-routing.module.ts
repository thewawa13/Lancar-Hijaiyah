import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JilidPage } from './jilid.page';

const routes: Routes = [
  {
    path: '',
    component: JilidPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JilidPageRoutingModule {}
