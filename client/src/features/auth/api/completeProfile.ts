import { ApiResponse } from "@/types";
import { convertToFormData } from "@/utils";
import { Auth, AuthTokenResponse } from "@/utils/models";

type Props = {
  values: {
    displayName: string;
    bio: string;
    avatar?: any;
  };
};

export const completeProfile = async (
  props: Props,
): Promise<ApiResponse<Omit<AuthTokenResponse, "access_token">>> => {
  const { values } = props;
  const model = new Auth();
  const editValues = {
    ...values,
    avatar: values?.avatar && (values?.avatar[0] as File),
  };
  const parseValues: FormData = convertToFormData<Props[`values`]>(editValues);

  const res = await model.completeProfile().multipleForm(parseValues);
  return res.json();
};
