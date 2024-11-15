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
          hasMore={!!hasNextPage}
          loader={
            <div className="my-2 w-full rounded-md bg-slate-100 p-4 text-xs text-slate-800">
              loading more...
            </div>
          }
          className="flex flex-col gap-2"
        >
          {chats?.map((chat) => <ChatListItem chatItem={chat} />)}
        </InfiniteScroll>
      )}
    </>
  );
};
