import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { MessageComponent } from './message.component';
@NgModule({
  imports: [
    CommonModule,
    IonicModule,
  ],
  declarations: [MessageComponent],
  exports: [MessageComponent]
})
export class MessagePageModule {}
