import { Component, OnInit, OnChanges, Input, ElementRef,
  SimpleChanges } from '@angular/core';
import { getColor } from "./color-generator";

@Component({
  selector: 'text-avatar',
  templateUrl: './text-avatar.component.html',
  styleUrls: ['./text-avatar.component.scss'],
})
export class TextAvatarComponent implements OnInit {
  @Input() name: string;
  @Input() color: string;
  displayName: string;
  constructor() {
   }

  ngOnInit() {
    this.displayName = this.name.substring(0, 2).toUpperCase();
  }
  getColor() {
    return getColor(this.displayName);
  }
}
