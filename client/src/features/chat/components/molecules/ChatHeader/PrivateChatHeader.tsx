import { ChatShowResponse } from "@/utils/models";
import { Avatar } from "@nextui-org/react";

type Props = {
  data: ChatShowResponse;
};

export const PrivateChatHeader = (props: Props) => {
  const { data } = props;
  const participant = data.participants[0];
  return (
    <div className="flex items-center gap-4 rounded-md bg-slate-300 p-4 shadow-md">
      <Avatar
        src={participant.avatar}
        alt={participant.username}
        size="sm"
        className="h-8 w-8 border border-slate-400"
      />
      <div>
        <h2 className="text-lg font-semibold text-slate-700">
          {participant.username}
        </h2>
      </div>
    </div>
  );
};
