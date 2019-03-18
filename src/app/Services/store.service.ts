import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Message, Channel, User } from '../Models/chat.models';

@Injectable({
  providedIn: 'root'
})

export class RxjsStore {
  usersArrayIndex = {};
  channelArrayIndex = {};
  messageArrayIndex = {};
  messages: BehaviorSubject<Array<Message>> = new BehaviorSubject([]);
  channels: BehaviorSubject<Array<Channel>> = new BehaviorSubject([]);
  users: BehaviorSubject<Array<User>> = new BehaviorSubject([]);
  loggedInUser: BehaviorSubject<string> = new BehaviorSubject('');
  currentChannels = this.channels.asObservable();
  currentMessages = this.messages.asObservable();
  currentUsers = this.users.asObservable();
  constructor() {
    // this.chatService.getMessages().subscribe((message: Array<Message>) => {
    //   this.messages.next(message);
    // });
    // this.chatService.getChannels().subscribe((channels: Array<Channel>) => {
    //   this.channels.next(channels);
    // });
    // this.chatService.getUsers().subscribe((users: Array<User>) => {
    //   this.users.next(users);
    // });
  }
  getChannelDetails(id: number) {
    const channels: Array<Channel> = [...this.channels.getValue()];
    const ChannEls = channels.filter((channel: Channel) => {
      return channel.channel_id === Number(id);
    });
    return ChannEls;
  }
  getChannelMessages(channel_id) {
    const Messages: Array<Message> = [...this.messages.getValue()];
    const messages = Messages.filter((message: Message) => {
      return message.message_id === channel_id;
    });
  }
  addUser(user) {
    const users: Array<User> = [...this.users.getValue()];
    let index = this.usersArrayIndex[user.user_id];
    if (index === undefined) {
      index = users.length;
      this.usersArrayIndex[user.user_id] = index;
    }
    users[index] = user;
    this.users.next(users);
  }
  async addMessage(messages: Array<any>) {
    const Messages: Array<Message> = [...this.messages.getValue()];
    await messages.forEach((message) => {
    let index = this.messageArrayIndex[message.message_id];
    if (index === undefined) {
      index = Messages.length;
      this.messageArrayIndex[message.message_id] = index;
    }
      Messages[index] = message;
    });
    this.messages.next(Messages);
  }
  addChannel(channel) {
    const channels: Array<Channel> = [...this.channels.getValue()];
    let index = this.channelArrayIndex[channel.channel_id];
    if (index === undefined) {
      index = channels.length;
      this.channelArrayIndex[channel.channel_id] = index;
    }
    channels[index] = channel;
    this.channels.next(channels);
  }
  addLoggedinUser(uid: string) {
    this.loggedInUser.next(uid);
  }
  getUser(uid: string): any {
    return this.users.getValue().map((user: User) => {
      if (user.user_id === uid) {
        return user;
      }
    });
  }
}
