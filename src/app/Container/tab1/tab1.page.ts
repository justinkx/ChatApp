import { Component, OnInit } from '@angular/core';
import { Todo, TodoService } from '../../Services/todo.service';
import { Router } from '@angular/router';
import { RxjsStore } from '../../Services/store.service';
import { Message, Channel, User } from '../../Models/chat.models';
import { BehaviorSubject } from 'rxjs';
import { ChatService } from './../../Services/chat.services';

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
  constructor(private todoService: TodoService,
  private chatService: ChatService,
  private rxjsStore: RxjsStore,
  private router: Router) {
    this.rxjsStore.channels.subscribe((channels: Array<Channel>) => {
      this.channels = channels;
    });
    this.rxjsStore.loggedInUser.subscribe((uid: string) => {
      this.loggedinUid = uid;
    });
    this.rxjsStore.users.subscribe((USERS: Array<User>) => {
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
    this.todoService.getTodos().subscribe(res => {
      this.todos = res;
    });
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

}
