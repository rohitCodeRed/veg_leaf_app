import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RnnPage } from './rnn.page';

const routes: Routes = [
  {
    path: '',
    component: RnnPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RnnPageRoutingModule {}
