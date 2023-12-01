import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TamuPageRoutingModule } from './tamu-routing.module';

import { TamuPage } from './tamu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TamuPageRoutingModule
  ],
  declarations: [TamuPage]
})
export class TamuPageModule {}
