import { ApiResponse } from "@/types";
import { Auth, AuthUserResponse } from "@/utils/models";

type Props = {
  values: {
    username?: string;
    password?: string;
    email?: string;
  };
};
export const register = async (
  props: Props,
): Promise<ApiResponse<AuthUserResponse>> => {
  const model = new Auth();
  const res = await model.register().post(props.values);
  return res.json();
};
