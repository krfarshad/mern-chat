import { useInfiniteQuery } from "@tanstack/react-query";
import { getMessages } from "../api/getMessages";
import { MessagesResponse } from "@/utils/models";

type Props = {
  id: string;
};
const useMessages = (props: Props) => {
  const { id } = props;
  const queryFn = (props: any) =>
    getMessages({
      id,
      pageParam: props.pageParam,
    });

  const res = useInfiniteQuery({
    queryKey: ["messages", id],
    queryFn: queryFn,
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.meta.last_page == lastPage.meta.current_page
        ? undefined
        : lastPage.meta.current_page + 1,
  });

  const messages = res.data?.pages.reduce((acc: MessagesResponse[], page) => {
    return [...acc, ...page.data];
  }, []);

  return { ...res, messages };
};

export default useMessages;
