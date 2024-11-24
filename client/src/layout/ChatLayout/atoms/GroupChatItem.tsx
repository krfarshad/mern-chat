import React from "react";
import { Avatar, Badge } from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChatItemProp } from "../molecules/ChatListItem";

type Props = {
  chatItem: ChatItemProp;
};

export const GroupChatItem = (props: Props) => {
  const { chatItem } = props;
  const pathname = usePathname();
  const isActive = pathname?.startsWith(`/${chatItem.id}`);
  return (
    <Link
      href={`/chats/${chatItem?.id}`}
      className={`flex flex-row items-center rounded-xl px-4 py-2 hover:bg-gray-100 ${isActive && "bg-sky-100"}`}
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200">
        <Badge
          content={<span className="text-[9px]">{chatItem.type}</span>}
          color="primary"
          size="sm"
          variant="solid"
          placement="bottom-left"
          className="!border-0"
        >
          <Avatar
            isBordered
            color="primary"
            src={chatItem?.avatar}
            alt={chatItem?.name}
            className=" h-8 w-8 rounded-full"
          />
        </Badge>
      </div>
      <div className="ml-2 flex-1 text-left">
        <p className="max-w-[140px] overflow-hidden text-ellipsis whitespace-nowrap text-sm font-semibold">
          {chatItem.name}
        </p>
        <p className="max-w-[140px] overflow-hidden text-ellipsis whitespace-nowrap text-xs text-gray-500">
          {chatItem?.lastMessage?.text}
        </p>
      </div>
    </Link>
  );
};
