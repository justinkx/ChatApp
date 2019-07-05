import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  @Input() message: any;
  @Input() index: number;
  constructor() { }

  ngOnInit() {
  }

}
