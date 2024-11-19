import { Model } from "../Model";

export type ChatListResponse = any;

export type PrivateChatResponse = {
  id: number;
  type: "private";
  participants: { id: number; username: string; avatar: string }[];
};

export type GroupChatResponse = {
  id: number;
  type: "group";
  participants: { id: number; username: string; avatar: string }[];
  admin: { id: number; username: string; avatar: string };
  name: string;
  avatar: string;
};

export type ChatShowResponse = PrivateChatResponse | GroupChatResponse;

export type MessagesResponse = any;

export class Chat extends Model {
  public resource(): string {
    return "chats";
  }

  public chatList = () => {
    return this.customUrl("chats");
  };

  public chatShow = (id: string) => {
    return this.customUrl(`chats/${id}`);
  };

  public messages = (id: string) => {
    return this.customUrl(`chats/${id}/messages`);
  };
}
