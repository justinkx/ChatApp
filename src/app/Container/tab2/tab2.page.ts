import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  Progress: number = 0;
  constructor() {

  }
  ionViewWillEnter() {
    const interval = setInterval(()=>{
      this.Progress+= 2;
      if (this.Progress >= 100) {
        clearInterval(interval);
      }
    },500)
  }
}
