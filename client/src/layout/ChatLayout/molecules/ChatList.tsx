"use client";
import { useChatList } from "@/features/chat";
import { ChatListItem } from "./ChatListItem";
import InfiniteScroll from "react-infinite-scroll-component";
import { SpinLoading } from "@/components";
import { Refetch } from "@/features/error";
import { useEffect, useRef } from "react";

export const ChatList = () => {
  const {
    chats,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
    refetch,
    isSuccess,
  } = useChatList();
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };

    const callback: IntersectionObserverCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          fetchNextPage();
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);
    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [chats]);

  if (isLoading && !chats) {
    return <p className="p-1 text-center text-gray-400">loading ...</p>;
  }
  if (isError) {
    return <Refetch onClick={refetch} />;
  }

  return (
    <>
      {isSuccess && chats && (
        <>
          {chats.length > 0 ? (
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
                  <div className="px-1" ref={loaderRef}>
                    <SpinLoading />
                  </div>
                )}
              </>
            </InfiniteScroll>
          ) : (
            <p className="p-1 text-center text-xs">You have no chat yet!</p>
          )}
        </>
      )}
    </>
  );
};
