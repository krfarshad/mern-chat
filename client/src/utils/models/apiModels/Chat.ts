import { Model } from "../Model";

export type ChatListResponse = any;
export type ChatShowResponse = any;

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
