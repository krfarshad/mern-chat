import { ApiResponse } from "@/types";
import { Auth } from "@/utils/models";

export const logout = async (): Promise<ApiResponse<null>> => {
  const res = await new Auth().logout().get();
  return res.json();
};
