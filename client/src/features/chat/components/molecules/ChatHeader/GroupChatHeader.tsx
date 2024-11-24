import { GroupChatResponse } from "@/utils/models";
import { Avatar } from "@nextui-org/react";

type Props = {
  data: GroupChatResponse;
};

export const GroupChatHeader = (props: Props) => {
  const { data } = props;
  return (
    <div className="w-full bg-slate-300 p-4">
      <div className="flex items-center gap-2.5">
        <div>
          <Avatar
            src={data.avatar}
            alt={data.name}
            size="sm"
            className="h-8 w-8 border border-slate-400"
          />
        </div>
        <p className="max-w-full flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-sm font-semibold">
          {data?.name}
        </p>
      </div>
    </div>
  );
};

export default GroupChatHeader;
