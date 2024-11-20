import { useInfiniteQuery } from "@tanstack/react-query";
import { getMessages } from "../api/getMessages";
import { MessageResponse } from "@/utils/models";

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

  return { ...res, messages };
};

export default useMessages;
