import { GroupChatResponse } from "@/utils/models";
import { Avatar, AvatarGroup } from "@nextui-org/react";

type Props = {
  data: GroupChatResponse;
};

export const GroupChatHeader = (props: Props) => {
  const { data } = props;
  return (
    <div className="w-full bg-slate-300 p-4">
      <div className="align-items flex gap-2.5">
        <div>
          <Avatar
            src={data.avatar}
            alt={data.name}
            size="sm"
            className="h-8 w-8 border border-slate-400"
          />
        </div>
        <div className="flex-1">
          <p className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-sm font-semibold">
            {data?.name}
          </p>
          <div className="inline-flex justify-start">
            <AvatarGroup isBordered max={3}>
              {data.participants.map((member) => (
                <Avatar
                  key={`members_${member.username}`}
                  src={member.avatar}
                  className="h-3 w-3 bg-white"
                  size="sm"
                />
              ))}
            </AvatarGroup>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupChatHeader;
