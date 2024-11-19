import { ChatShowResponse } from "@/utils/models";
import { PrivateChatHeader } from "./PrivateChatHeader";
import GroupChatHeader from "./GroupChatHeader";

type Props = {
  data: ChatShowResponse;
};

export const ChatHeader = (props: Props) => {
  const { data } = props;
  return (
    <>
      {data.type === "private" ? (
        <PrivateChatHeader data={data} />
      ) : (
        <GroupChatHeader data={data} />
      )}
    </>
  );
};
