import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JilidPageRoutingModule } from './jilid-routing.module';

import { JilidPage } from './jilid.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JilidPageRoutingModule
  ],
  declarations: [JilidPage]
})
export class JilidPageModule {}
