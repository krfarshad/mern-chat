"use client";
import { useQuery } from "@tanstack/react-query";
import { getChat } from "../../api/getChat";
import { ChatContentLoading } from "@/components";
import { Refetch } from "@/features/error";
import { notFound } from "next/navigation";
import { ChatFooter } from "../molecules/ChatFooter";
import { ChatHeader } from "../molecules/ChatHeader";
import { Messages } from "../molecules/Messages";

type Props = {
  id: string;
};
export const ChatContent = (props: Props) => {
  const { id } = props;
  const { data, isSuccess, isLoading, isError, refetch } = useQuery({
    queryKey: ["chat-show", id],
    queryFn: async () => await getChat({ id }),
  });

  if (isLoading) {
    return <ChatContentLoading />;
  }

  if (isError) {
    return <Refetch onClick={refetch} />;
  }

  if (isSuccess && data.status == 404) {
    return notFound();
  }
  return (
    <>
      {isSuccess && (
        <>
          <ChatHeader data={data.data} />
          <Messages id={id} />
          <ChatFooter id={id} />
        </>
      )}
    </>
  );
};
