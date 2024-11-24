import React from "react";
import { Avatar, Badge } from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChatItemProp } from "../molecules/ChatListItem";

type Props = {
  chatItem: ChatItemProp;
};

export const PrivateChatItem = (props: Props) => {
  const { chatItem } = props;
  const pathname = usePathname();
  const isActive = pathname?.startsWith(`/${chatItem.id}`);
  return (
    <Link
      href={`/chats/${chatItem?.id}`}
      className={`flex flex-row items-center rounded-xl p-2 hover:bg-gray-100 ${isActive && "bg-sky-100"}`}
    >
      <div className="relative flex items-center justify-center rounded-full bg-gray-200">
        <Badge
          content={
            <span className="-mb-16 -ml-0.5 inline-block rounded-md bg-red-200 px-0.5 text-[8px]">
              {chatItem.type}
            </span>
          }
          color="danger"
          size="sm"
          placement="bottom-right"
        >
          <Avatar
            isBordered
            color="danger"
            src={chatItem?.participants[0]?.avatar}
            alt={chatItem?.participants[0]?.username}
            className=" h-8 w-8 rounded-full"
          />
        </Badge>
      </div>
      <div className="ml-2 flex-1 text-left">
        <p className="max-w-[140px] overflow-hidden text-ellipsis whitespace-nowrap text-sm font-semibold">
          {chatItem?.participants[0]?.username}
        </p>
        <p className="max-w-[140px] overflow-hidden text-ellipsis whitespace-nowrap text-xs text-gray-500">
          {chatItem?.lastMessage?.text}
        </p>
      </div>
    </Link>
  );
};
