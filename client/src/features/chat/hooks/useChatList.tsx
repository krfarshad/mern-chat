"use client";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { getChats } from "../api/getChats";

import { ChatListResponse } from "@/utils/models";
import { useSocket } from "@/hooks/useSocket";

type UseChatListResult = {
  chats: ChatListResponse[] | undefined;
  fetchNextPage: () => void;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
};

export const useChatList = (): UseChatListResult => {
  const queryClient = useQueryClient();
  const socket = useSocket();
  const res = useInfiniteQuery({
    queryKey: ["chats"],
    queryFn: async ({ pageParam = 1 }) => await getChats({ pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.meta.last_page == lastPage.meta.current_page
        ? undefined
        : lastPage.meta.current_page + 1,
  });

  const chats = res.data?.pages.reduce((acc: ChatListResponse[], page) => {
    return [...acc, ...page.data];
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("newMessage", (newMessage) => {
        queryClient.setQueryData(["chats"], (oldData: any) => {
          return {
            ...oldData,
            pages: oldData.pages.map((page: any) =>
              page.data.map((chat: ChatListResponse) =>
                chat._id === newMessage.chatId
                  ? { ...chat, lastMessage: newMessage }
                  : chat,
              ),
            ),
          };
        });
      });

      socket.on("newChat", (newChat) => {
        queryClient.setQueryData(["chats"], (oldData: any) => ({
          ...oldData,
          pages: [[newChat, ...oldData.pages[0]], ...oldData.pages.slice(1)],
        }));
      });

      return () => {
        socket.off("newMessage");
        socket.off("newChat");
      };
    }
  }, [queryClient, socket]);

  return {
    ...res,
    chats,
  };
};
