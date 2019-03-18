import { Component, OnInit } from '@angular/core';
import { Todo, TodoService } from './../../Services/todo.service';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { RxjsStore } from './../../Services/store.service';
import { Message, Channel, User } from '../../Models/chat.models';
import { ChatService } from './../../Services/chat.services';
import { Subscriber } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  todo: Todo = {
    task: 'test',
    createdAt: new Date().getTime(),
    priority: 2
  };
  channelId: number = null;
  channelData: Channel;
  messageSubscriber$;
  messages$: Array<Message>;
  message: string;
  loggedInUser: string;
  constructor(private route: ActivatedRoute,
    private nav: NavController,
    public rxjsStore: RxjsStore,
    private router: Router,
    private chatService: ChatService,
    private todoService: TodoService,
    private loadingController: LoadingController) {
      this.channelId = this.route.snapshot.params['id'];
      this.messageSubscriber$ = this.rxjsStore.messages.subscribe((messages: Array<Message>) => {
        this.messages$ = messages.filter((message: Message) => {
          return message.channel_id === Number(this.channelId);
        });
        console.log(this.messages$);
      });
      this.rxjsStore.loggedInUser.subscribe((uid: string) => {
        this.loggedInUser = uid;
      });
    }
    ngOnInit() {
      if (this.channelId)  {
        this.loadChannelDetails(this.channelId);
      }
    }
    ionViewWillLeave() {
      console.log('on destory');
      this.messageSubscriber$.unsubscribe();
    }
    loadChannelDetails(id: number) {
      this.channelData = this.rxjsStore.getChannelDetails(id)[0];
      this.loadMessages(this.channelData);
    }
    loadMessages(channelData: Channel) {
      this.chatService.getMessages(channelData.channel_id);
    }
    sendMessage() {
      const messageData: Message = {
        channel_id: Number(this.channelId),
        message: this.message,
        user_id: this.loggedInUser,
        time_stamp: Number(new Date())
      };
      console.log(messageData);
      this.chatService.insertMessage(messageData).then((id) => {
        this.message = '';
      });
    }
}
