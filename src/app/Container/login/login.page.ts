import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../../Services/authentication.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string;
  password: string;
  constructor(public authService: AuthenticationService,
    private storage: Storage,
    public afAuth: AngularFireAuth) { }
  ngOnInit() {
    this.storage.get('email').then((email) => {
      this.email = email;
    });
    this.storage.get('password').then((password) => {
      this.password = password;
    });
  }
  login() {
    this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password)
    .then((response: any) => {
      if (response) {
        this.storage.set('email', response.user.email);
        this.storage.set('password', this.password);
        this.authService.login(response.user.uid);
      }
    })
    .catch((error) => {
    });
    // this.authService.login();
  }

}
