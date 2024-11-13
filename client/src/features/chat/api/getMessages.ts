import { ApiResponse, QueryParams } from "@/types";
import { Chat, MessagesResponse, makeModelBaseOnQuery } from "@/utils/models";

type Props = {
  id: string;
  pageParam: number;
};
export const getMessages = async (
  props: Props,
): Promise<ApiResponse<MessagesResponse[]>> => {
  const { pageParam, id } = props;
  const queryParams: QueryParams = {
    page: pageParam,
  };
  const apiModel = new Chat();
  const model = makeModelBaseOnQuery(apiModel.messages(id), queryParams);

  const res = await model.get();
  return res.json();
};
