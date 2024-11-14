import { ApiPaginateResponse, QueryParams } from "@/types";
import { Chat, ChatListResponse, makeModelBaseOnQuery } from "@/utils/models";

type Props = {
  pageParam: number;
};

export const getChats = async (
  props: Props,
): Promise<ApiPaginateResponse<ChatListResponse[]>> => {
  const { pageParam } = props;

  const apiModel = new Chat();

  const queryParams: QueryParams = {
    page: pageParam,
  };
  const model = makeModelBaseOnQuery(apiModel.chatList(), queryParams);

  const res = await model.get();
  return res.json();
};
