import { ApiResponse } from "@/types";
import { Auth, AuthTokenResponse } from "@/utils/models";

type Props = {
  displayName: string;
  bio: string;
  avatar?: any;
};

export const completeProfile = async (
  props: Props,
): Promise<ApiResponse<Omit<AuthTokenResponse, "access_token">>> => {
  const model = new Auth();
  const res = await model.completeProfile().patch(props);
  return res.json();
};
