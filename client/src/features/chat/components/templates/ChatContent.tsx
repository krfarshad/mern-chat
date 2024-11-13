"use client";
import { useQuery } from "@tanstack/react-query";
import { getChat } from "../../api/getChat";
import { ChatContentLoading } from "@/components";
import { Refetch } from "@/features/error";
import { ChatHeader } from "../molecules/ChatHeader";
import { notFound } from "next/navigation";
import { ChatFooter } from "../molecules/ChatFooter";
import { MessageItems } from "../molecules/MessageItems";

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
          <ChatHeader />
          <div className="-mx-4 mb-4 flex h-full flex-col overflow-x-auto px-4">
            <div className="flex h-full flex-col">
              <div className="grid grid-cols-12 gap-y-2">
                <MessageItems id={id} />
              </div>
            </div>
          </div>
          <ChatFooter id={id} />
        </>
      )}
    </>
  );
};
