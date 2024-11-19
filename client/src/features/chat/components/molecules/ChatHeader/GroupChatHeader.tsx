import { ChatShowResponse } from "@/utils/models";

type Props = {
  data: ChatShowResponse;
};

export const GroupChatHeader = (props: Props) => {
  const { data } = props;
  return <div className="w-full bg-slate-300 p-4">ChatHeader</div>;
};

export default GroupChatHeader;
