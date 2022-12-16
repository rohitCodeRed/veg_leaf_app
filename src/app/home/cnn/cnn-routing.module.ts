import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CnnPage } from './cnn.page';

const routes: Routes = [
  {
    path: '',
    component: CnnPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CnnPageRoutingModule {}
