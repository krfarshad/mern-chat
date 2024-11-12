import { ApiResponse } from "@/types";
import { Auth } from "@/utils/models";

type Props = {
  username: string;
};
export const forgetPassword = async (
  props: Props,
): Promise<ApiResponse<null>> => {
  const model = new Auth();
  const res = await model.forgetPassword().post(props);
  return res.json();
};
