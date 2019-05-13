import { Component, OnInit, OnDestroy } from '@angular/core';
import { Todo, TodoService } from '../../Services/todo.service';
import { Router } from '@angular/router';
import { RxjsStore } from '../../Services/store.service';
import { Message, Channel, User } from '../../Models/chat.models';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ChatService } from '../../Services/chat.services';
import { LoaderService } from '../../Services/loader.service';

export interface Message {
  message_id?: string;
  message: string;
  channel_id: number;
  time_stamp: number;
  user_id: string;
}
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  todos: Todo[];
  channels: Channel[];
  loggedinUid: string;
  userData: BehaviorSubject<User> = new BehaviorSubject(null);
  channelSubscribers$: Subscription;
  userSubscribers$: Subscription;

  constructor(private todoService: TodoService,
  private chatService: ChatService,
  private loader: LoaderService,
  private rxjsStore: RxjsStore,
  private router: Router) {
    this.channelSubscribers$ = this.rxjsStore.channels
    .subscribe((channels: Array<Channel>) => {
      if (channels) {
        this.loader.hide();
      }
      this.channels = channels;
    });
    this.rxjsStore.loggedInUser.subscribe((uid: string) => {
      this.loggedinUid = uid;
    });
    this.userSubscribers$ = this.rxjsStore.users
    .subscribe((USERS: Array<User>) => {
      USERS.map((user: User) => {
        if (user.user_id === this.loggedinUid) {
          this.userData.next(user);
          this.loadChannels();
        }
      });
    });
  }
  loadChannels() {
    this.userData.subscribe((user: User) => {
      if (user) {
        user.channels.forEach((channel: number) => {
          this.chatService.getChannel(channel);
        });
      }
    });
  }
  ngOnInit() {
    this.loader.show();
  }
  openChat(id) {
    this.router.navigate([`tabs/tab1/details/${id}`]);
  }
  remove(item) {
    this.todoService.removeTodo(item.id);
  }
  createChannel() {
    this.router.navigateByUrl(`tabs/tab1/createChannel`);
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy() {
    this.channelSubscribers$.unsubscribe();
    this.userSubscribers$.unsubscribe();
  }
}
