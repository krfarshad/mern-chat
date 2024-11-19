import { PrivateChatItem } from "../atoms/PrivateChatItem";
import { GroupChatItem } from "../atoms/GroupChatItem";

export type ChatItemProp = {
  id: number;
  type: "group" | "private";
  avatar: string;
  name: string;
  lastMessage: { text: string };
  participants: { id: number; avatar: string; username: string }[];
};

type Props = {
  chatItem: ChatItemProp;
};
export const ChatListItem = (props: Props) => {
  const { chatItem } = props;
  return (
    <>
      {chatItem.type === "private" ? (
        <PrivateChatItem chatItem={chatItem} />
      ) : (
        <GroupChatItem chatItem={chatItem} />
      )}
    </>
  );
};
