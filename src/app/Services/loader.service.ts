import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loading: any;
  constructor(public loadingController: LoadingController) {
   }
   async show() {
    if (!this.loading) {
      this.loading = await this.loadingController.create({
        message: 'Loading ...',
      });
      await this.loading.present();
    }
   }
   async hide() {
     if (this.loading) {
       this.loading.dismiss();
       this.loading = null;
     }
   }
}
