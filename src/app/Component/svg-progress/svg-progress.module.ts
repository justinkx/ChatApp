import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SvgProgressComponent } from './svg-progress.component';
@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [SvgProgressComponent],
  exports: [SvgProgressComponent]
})
export class SvgProgressModule { }
