import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RnnPageRoutingModule } from './rnn-routing.module';

import { RnnPage } from './rnn.page';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RnnPageRoutingModule,
    NgChartsModule,
    ReactiveFormsModule
  ],
  declarations: [RnnPage]
})
export class RnnPageModule {}
