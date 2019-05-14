import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { TextAvatarComponent } from './text-avatar.component';
@NgModule({
  imports: [
    CommonModule,
    IonicModule,
  ],
  declarations: [TextAvatarComponent],
  exports: [TextAvatarComponent]
})
export class TextAvatarModule { }
