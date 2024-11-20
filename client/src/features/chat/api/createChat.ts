import { ApiResponse } from "@/types";
import { convertToFormData } from "@/utils";
import { Chat } from "@/utils/models";

type Props = {
  values: CreateChatProps;
};

export const createChat = async (props: Props): Promise<ApiResponse<any>> => {
  const { values } = props;

  const apiModel = new Chat();
  if (values.avatar) {
    const editValues = {
      ...values,
      avatar: values.avatar[0],
    };
    const parseValues: FormData =
      convertToFormData<Props[`values`]>(editValues);
    const req = await apiModel.chatList().multipleForm(parseValues);
    return await req.json();
  } else {
    const req = await apiModel.chatList().post(values);
    return await req.json();
  }
};
