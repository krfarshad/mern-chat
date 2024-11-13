import { ApiResponse } from "@/types";
import { convertToFormData } from "@/utils";
import { Chat } from "@/utils/models";

type Props = {
  values: any;
  id: string;
};

export const postMessage = async (props: Props): Promise<ApiResponse<any>> => {
  const { values, id } = props;

  const apiModel = new Chat();

  if (values && values?.images?.length == 0) {
    delete values.images;
    const req = await apiModel.messages(id).post(values);
    return await req.json();
  } else {
    const parseValues: FormData = convertToFormData<Props[`values`]>(values);
    const req = await apiModel.messages(id).multipleForm(parseValues);
    return await req.json();
  }
};
