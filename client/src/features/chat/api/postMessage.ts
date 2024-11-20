import { ApiResponse } from "@/types";
import { convertToFormData } from "@/utils";
import { Chat } from "@/utils/models";

type Props = {
  values: { text: string; images?: File[] };
  chatId: string;
};

export const postMessage = async (props: Props): Promise<ApiResponse<any>> => {
  const { values, chatId } = props;
  console.log("postMessage", postMessage);
  const apiModel = new Chat();

  if (values && values?.images && values?.images?.length > 0) {
    const parseValues: FormData = convertToFormData<Props[`values`]>(values);
    const req = await apiModel.messages(chatId).multipleForm(parseValues);
    return await req.json();
  } else {
    delete values.images;
    const req = await apiModel.messages(chatId).post(values);
    return await req.json();
  }
};
