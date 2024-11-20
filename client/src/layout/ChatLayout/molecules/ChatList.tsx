"use client";
import { useChatList } from "@/features/chat";
import { ChatListItem } from "./ChatListItem";
import InfiniteScroll from "react-infinite-scroll-component";

export const ChatList = () => {
  const { chats, fetchNextPage, hasNextPage } = useChatList();
  return (
    <>
      {chats && chats.length > 0 && (
        <InfiniteScroll
          dataLength={chats ? chats.length : 0}
          next={() => fetchNextPage()}
          hasMore={hasNextPage || false}
          className="flex flex-col gap-2 px-1"
          loader={<></>}
        >
          <>
            {chats?.map((chat) => (
              <ChatListItem
                key={`chat_item_${chat.id}_${chat.createdAt}`}
                chatItem={chat}
              />
            ))}
            {hasNextPage && (
              <div className="my-4 p-1">
                <div className="p-4 text-center text-xs">loading more ...</div>
              </div>
            )}
          </>
        </InfiniteScroll>
      )}
    </>
  );
};
