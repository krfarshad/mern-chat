"use client";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect } from "react";
import { getChats } from "../api/getChats";
import { ChatListResponse } from "@/utils/models";
import { useWebSocket } from "@/context/SocketProvider";

export const useChatList = () => {
  const queryClient = useQueryClient();
  const socket = useWebSocket();
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
      socket.on("newChat", handleNewChat);
      return () => {
        socket.off("newChat", handleNewChat);
      };
    }
  }, [socket, handleNewChat]);

  return {
    ...res,
    chats,
  };
};
