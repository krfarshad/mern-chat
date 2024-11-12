import { ApiResponse } from "@/types";
import { Auth, AuthUserResponse } from "@/utils/models";

type Props = {
  username: string;
  password: string;
};
export const register = async (
  props: Props,
): Promise<ApiResponse<AuthUserResponse>> => {
  const model = new Auth();
  const res = await model.register().post(props);
  return res.json();
};
