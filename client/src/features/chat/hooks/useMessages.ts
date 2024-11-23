"use client";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { getMessages } from "../api/getMessages";
import { MessageResponse } from "@/utils/models";
import { useEffect, useCallback } from "react";
import { useWebSocket } from "@/context/SocketProvider";

type Props = {
  id: string;
};

const useMessages = ({ id }: Props) => {
  const socket = useWebSocket();
  const queryClient = useQueryClient();

  const queryFn = ({ pageParam }: any) =>
    getMessages({
      id,
      pageParam,
    });

  const res = useInfiniteQuery({
    queryKey: ["messages", id],
    queryFn,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage?.meta?.page < lastPage?.meta?.totalPages) {
        return lastPage.meta.page + 1;
      }
      return undefined;
    },
  });

  const messages = res.data?.pages.reduce((acc: MessageResponse[], page) => {
    return page?.data ? [...acc, ...page?.data] : acc;
  }, []);

  const handleNewMessage = useCallback(
    (newMessage: MessageResponse) => {
      queryClient.setQueryData(["messages", id], (oldData: any) => {
        if (!oldData) return { pages: [{ data: [newMessage] }] };
        const updatedPages = [...oldData.pages];
        updatedPages[0] = {
          data: [newMessage, ...(updatedPages[0]?.data || [])],
          meta: updatedPages[0]?.meta,
        };
        return {
          ...oldData,
          pages: updatedPages,
        };
      });
    },
    [id, queryClient],
  );

  useEffect(() => {
    if (socket) {
      socket.emit("add-user", id);
      socket.on("newMessage", handleNewMessage);
      return () => {
        socket.off("newMessage", handleNewMessage);
      };
    }
  }, [socket, handleNewMessage]);

  return { ...res, messages };
};

export default useMessages;
