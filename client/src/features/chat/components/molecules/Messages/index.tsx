import useMessages from "@/features/chat/hooks/useMessages";
import { useSession } from "next-auth/react";
import { Fragment, useEffect, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { SelfMessage } from "./SelfMessage";
import { OtherMessage } from "./OtherMessage";
import { Refetch } from "@/features/error";

type Props = {
  id: string;
};

export const Messages = (props: Props) => {
  const { id } = props;
  const loaderRef = useRef<HTMLDivElement>(null);
  const chatBoxRef = useRef<HTMLDivElement>(null);

  const { data: session } = useSession();
  const {
    messages,
    isSuccess,
    hasNextPage,
    fetchNextPage,
    refetch,
    isError,
    isLoading,
  } = useMessages({
    id,
  });

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

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
  }, [messages]);

  if (isLoading && !messages) {
    return <>general loading</>;
  }

  if (isError) {
    return <Refetch onClick={refetch} />;
  }

  return (
    <div className="flex h-full w-full flex-col-reverse  overflow-y-auto">
      <div
        className="flex flex-col-reverse overflow-y-auto px-5"
        ref={chatBoxRef}
      >
        {isSuccess && (
          <div>
            {messages && messages.length > 0 && (
              <InfiniteScroll
                dataLength={messages ? messages.length : 0}
                next={() => fetchNextPage()}
                hasMore={hasNextPage || false}
                loader={<></>}
                className="flex flex-col-reverse"
                scrollableTarget="infinite_messages"
              >
                <>
                  {messages.map((message) => (
                    <Fragment key={`message-item-${message.id}`}>
                      {session?.user.username == message?.sender.username ? (
                        <SelfMessage message={message} />
                      ) : (
                        <OtherMessage message={message} />
                      )}
                    </Fragment>
                  ))}
                  {hasNextPage && (
                    <div className="my-4 p-1" ref={loaderRef}>
                      <div className="p-4">loading ...</div>
                    </div>
                  )}
                </>
              </InfiniteScroll>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
