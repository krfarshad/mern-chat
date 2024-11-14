import { ApiResponse } from "@/types";
import { Auth, AuthUserResponse } from "@/utils/models";

type Props = {
  values: { username?: string; password?: string };
};
export const login = async (
  props: Props,
): Promise<ApiResponse<AuthUserResponse>> => {
  const model = new Auth();
  const res = await model.login().post(props.values);
  return res.json();
};
