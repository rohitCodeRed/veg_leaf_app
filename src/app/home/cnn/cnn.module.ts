import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CnnPageRoutingModule } from './cnn-routing.module';

import { CnnPage } from './cnn.page';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CnnPageRoutingModule,
    ScrollingModule,
    SharedModule
  ],
  declarations: [CnnPage]
})
export class CnnPageModule {}
