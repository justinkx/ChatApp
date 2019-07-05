import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, IonList , IonContent } from '@ionic/angular';
import { Router } from '@angular/router';
import { RxjsStore } from './../../Services/store.service';
import { Message, Channel, User } from '../../Models/chat.models';
import { ChatService } from './../../Services/chat.services';
import { Subscriber, Subscription } from 'rxjs';
import { LoaderService } from '../../Services/loader.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  @ViewChild(IonContent) contentArea: IonContent;
  @ViewChild(IonList, { read: ElementRef }) chatList: ElementRef;
  private mutationObserver: MutationObserver;
  channelId: number = null;
  channelData: Channel;
  messageSubscriber$: Subscription;
  messages$: Array<Message>;
  message: string;
  loggedInUser: string;
  constructor(private route: ActivatedRoute,
    private nav: NavController,
    public rxjsStore: RxjsStore,
    private router: Router,
    private chatService: ChatService,
    private loader: LoaderService) {
    this.channelId = this.route.snapshot.params['id'];
    this.messageSubscriber$ = this.rxjsStore.messages.subscribe((messages: Array<Message>) => {
      if (messages) {
        if (this.messages$ && messages.length > this.messages$.length) {
          setTimeout(() => {
            this.contentArea.scrollToBottom(300);
          }, 300);
        }
        this.messages$ = messages.filter((message: Message) => {
          return message.channel_id === Number(this.channelId);
        });
        this.loader.hide();
      }
      console.log(this.messages$);
    });
    this.rxjsStore.loggedInUser.subscribe((uid: string) => {
      this.loggedInUser = uid;
    });
  }
  ngOnInit() {
    if (this.channelId) {
      this.loadChannelDetails(this.channelId);
    }
  }

  ionViewWillEnter() {
    this.loader.show();
  }
  ionViewWillLeave() {
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
