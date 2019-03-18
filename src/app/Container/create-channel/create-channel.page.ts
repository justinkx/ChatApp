import { Component, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-create-channel',
  templateUrl: './create-channel.page.html',
  styleUrls: ['./create-channel.page.scss'],
})
export class CreateChannelPage implements OnInit {
  searchWord = '';

  constructor(db: AngularFirestore) { }

  ngOnInit() {
  }
  onSearchChange(event) {
  }
}
