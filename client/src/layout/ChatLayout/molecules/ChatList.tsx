"use client";
import { useChatList } from "@/features/chat";
import { ChatListItem } from "./ChatListItem";
import InfiniteScroll from "react-infinite-scroll-component";

export const ChatList = () => {
  const { chats, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useChatList();
  return (
    <>
      {chats && chats.length > 0 && (
        <InfiniteScroll
          dataLength={chats ? chats.length : 0}
          next={() => fetchNextPage()}
          hasMore={hasNextPage || false}
          className="flex flex-col gap-2"
          loader={<>loader...</>}
        >
          <>
            {chats?.map((chat) => (
              <ChatListItem
                key={`chat_item_${chat.id}_${chat.createdAt}`}
                chatItem={chat}
              />
            ))}
            <div className="my-2 w-full rounded-md bg-slate-100 p-4 text-xs text-slate-800">
              {isFetchingNextPage
                ? "Loading more..."
                : hasNextPage
                  ? "Load More"
                  : "Nothing more to load"}
            </div>
          </>
        </InfiniteScroll>
      )}
    </>
  );
};
