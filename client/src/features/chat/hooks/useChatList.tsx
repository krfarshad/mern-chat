"use client";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect } from "react";
import { getChats } from "../api/getChats";
import { ChatListResponse } from "@/utils/models";
import { useSocket } from "@/hooks/useSocket";

export const useChatList = () => {
  const queryClient = useQueryClient();
  const socket = useSocket();
  const queryFn = (props: any) =>
    getChats({
      pageParam: props.pageParam,
    });

  const res = useInfiniteQuery({
    queryKey: ["chats"],
    queryFn: queryFn,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage?.meta?.page < lastPage?.meta?.totalPages) {
        return lastPage.meta.page + 1;
      }
      return undefined;
    },
  });

  const chats = res.data?.pages.reduce((acc: ChatListResponse[], page) => {
    return page?.data ? [...acc, ...page?.data] : acc;
  }, []);
  const handleNewMessage = useCallback(
    (newMessage: any) => {
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
    },
    [queryClient],
  );

  const handleNewChat = useCallback(
    (newChat: any) => {
      queryClient.setQueryData(["chats"], (oldData: any) => ({
        ...oldData,
        pages: [[newChat, ...oldData.pages[0]], ...oldData.pages.slice(1)],
      }));
    },
    [queryClient],
  );

  useEffect(() => {
    if (socket) {
      socket.on("newMessage", handleNewMessage);
      socket.on("newChat", handleNewChat);

      return () => {
        socket.off("newMessage", handleNewMessage);
        socket.off("newChat", handleNewChat);
      };
    }
  }, [socket, handleNewMessage, handleNewChat]);

  return {
    ...res,
    chats,
  };
};
