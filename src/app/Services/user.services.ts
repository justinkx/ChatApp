import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Message, Channel, User } from '../Models/chat.models';
import { RxjsStore } from './store.service';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private userDocument: AngularFirestoreDocument<User>;
  constructor(private db: AngularFirestore,
    private rxjsStore: RxjsStore) {
  }
  getUser(id: string) {
    this.userDocument = this.db.doc(`users/${id}`);
    this.userDocument.valueChanges().subscribe((user) => {
      user.user_id = id;
      this.rxjsStore.addUser(user);
    });
  }
}
