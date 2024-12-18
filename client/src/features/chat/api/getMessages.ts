import { ApiPaginateResponse, QueryParams } from "@/types";
import { Chat, MessageResponse, makeModelBaseOnQuery } from "@/utils/models";

type Props = {
  id: string;
  pageParam: number;
};
export const getMessages = async (
  props: Props,
): Promise<ApiPaginateResponse<MessageResponse[]>> => {
  const { pageParam, id } = props;
  const queryParams: QueryParams = {
    page: pageParam,
  };
  const apiModel = new Chat();
  const model = makeModelBaseOnQuery(apiModel.messages(id), queryParams);

  const res = await model.get();
  return res.json();
};
