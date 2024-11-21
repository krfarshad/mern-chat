"use client";
import { useChatList } from "@/features/chat";
import { ChatListItem } from "./ChatListItem";
import InfiniteScroll from "react-infinite-scroll-component";
import { SpinLoading } from "@/components";
import { Refetch } from "@/features/error";

export const ChatList = () => {
  const { chats, fetchNextPage, hasNextPage, isLoading, isError, refetch } =
    useChatList();

  if (isLoading && !chats) {
    return <p className="p-1 text-center text-gray-400">loading ...</p>;
  }
  if (isError) {
    return <Refetch onClick={refetch} />;
  }

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
              <div className=" p-1">
                <SpinLoading />
              </div>
            )}
          </>
        </InfiniteScroll>
      )}
    </>
  );
};
