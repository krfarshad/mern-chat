import { ApiResponse } from "@/types";
import { Chat, ChatShowResponse } from "@/utils/models";

type Props = {
  id: string;
};
export const getChat = async (
  props: Props,
): Promise<ApiResponse<ChatShowResponse>> => {
  const { id } = props;
  const model = new Chat();
  const res = await model.chatShow(id).get();
  return res.json();
};
