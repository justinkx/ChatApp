export interface Message {
  message_id?: string;
  message: string;
  channel_id: number;
  time_stamp: number;
  user_id: string;
}

export interface Channel {
  channel_id?: any;
  members: Array<string>;
  name: string;
}

export interface User {
  first_name: string;
  last_name: string;
  user_id?: string;
  channels: Array<number>;
}
