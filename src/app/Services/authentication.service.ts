import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from './user.services';
import { RxjsStore } from './store.service';

const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  authenticationState = new BehaviorSubject(false);
  constructor(private storage: Storage,
    private userService: UserService,
    private rxjsStore: RxjsStore,
    private auth: AngularFireAuth,
    private plt: Platform) {
    this.plt.ready().then(() => {
      this.checkToken();
    });
  }

  checkToken() {
    this.storage.get(TOKEN_KEY).then((res: string) => {
      if (res) {
        this.rxjsStore.addLoggedinUser(res);
        this.authenticationState.next(true);
        this.userService.getUser(res);
      }
    });
  }

  login(uid: string) {
    this.storage.set(TOKEN_KEY, uid).then(() => {
      this.rxjsStore.addLoggedinUser(uid);
        this.authenticationState.next(true);
        this.userService.getUser(uid);
    });
  }

  logout() {
    this.auth.auth.signOut().then(() => {
      return this.storage.remove(TOKEN_KEY).then(() => {
        this.authenticationState.next(false);
      });
    });
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }
}
