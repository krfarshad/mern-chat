import useMessages from "@/features/chat/hooks/useMessages";
import InfiniteScroll from "react-infinite-scroll-component";

type Props = {
  id: string;
};

export const Messages = (props: Props) => {
  const { id } = props;

  const { messages, isSuccess, hasNextPage, fetchNextPage } = useMessages({
    id,
  });

  return (
    <div className="flex h-full w-full flex-col-reverse  overflow-y-auto  text-sm  font-medium  ">
      <div className="flex flex-col-reverse overflow-y-auto px-5">
        {isSuccess && (
          <div>
            {messages && messages.length > 0 && (
              <InfiniteScroll
                dataLength={messages ? messages.length : 0}
                next={() => fetchNextPage()}
                hasMore={hasNextPage}
                loader={<></>}
                className="flex flex-col-reverse"
              >
                <>
                  {messages.map((message) => (
                    <span
                      key={`message__${message.id}_${message.created_at}`}
                    ></span>
                    // <MessageEntry
                    // key={`message__${message.id}_${message.created_at}`}
                    //   message={message}
                    //   username={session.user.username}
                    //   activeTab={activeTab}
                    // />
                  ))}
                </>
              </InfiniteScroll>
            )}
          </div>
        )}
        {hasNextPage && (
          <div className="my-4 p-1" >
            loading for next page
          </div>
        )}
      </div>
    </div>
  );
};
