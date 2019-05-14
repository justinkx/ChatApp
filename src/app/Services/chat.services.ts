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
export class ChatService {
  private messageCollection: AngularFirestoreCollection<Message>;
  private channelCollection: AngularFirestoreCollection<Channel>;
  private userCollection: AngularFirestoreCollection<User>;
  private channelDocument: AngularFirestoreDocument<Channel>;
  private channels: Observable<Channel[]>;
  private messages: Observable<Message[]>;
  private users: Observable<User[]>;
  constructor(private db: AngularFirestore,
    private rxjsStore: RxjsStore) {
    this.messageCollection = db.collection<Message>('messages');
    this.channelCollection = db.collection<Channel>('channels');
    this.userCollection = db.collection<User>('users');
  }
  getMessages(channel_id?: number) {
    const query = this.messageCollection.ref.where('channel_id', '==', channel_id);
    query.get().then((snapShot) => {
      const messages: Array<any> = [];
      snapShot.docs.map((doc) => {
        const data = doc.data();
        const message_id = doc.id;
        messages.push({message_id, ...data});
      });
      console.log(`get messages chat service, ${messages}`);
      this.rxjsStore.addMessage(messages);
    })
    .catch(() => {
    });
    // this.messages = this.messageCollection.snapshotChanges().pipe(
    //   map(actions => {
    //     return actions.map(a => {
    //       const data = a.payload.doc.data();
    //       const message_id = a.payload.doc.id;
    //       return { message_id, ...data };
    //     });
    //   })
    // );
    // return this.messages;
  }
  getChannels(): Observable<Channel[]> {
    this.channels = this.channelCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const channel_id = a.payload.doc.id;
          return { channel_id, ...data};
        });
      })
    );
    return this.channels;
  }
  getChannel(channel_id: number) {
    this.channelDocument = this.db.doc(`channels/${channel_id}`);
    this.channelDocument.valueChanges()
    .subscribe((response: Channel) => {
      const channel = {channel_id: channel_id, ...response};
      this.rxjsStore.addChannel(channel);
    });
  }
  getUsers(): Observable<User[]> {
    this.users = this.userCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const user_id = a.payload.doc.id;
          return { user_id, ...data};
        });
      })
    );
    return this.users;
  }
  async insertMessage(messageData: Message) {
    await this.messageCollection.add(messageData).then((message) => {
      this.rxjsStore.addMessage([{message_id: message.id, ...messageData}]);
      return message.id;
    });
  }
}
