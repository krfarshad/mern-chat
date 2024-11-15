import { ApiPaginateResponse, QueryParams } from "@/types";
import { User, UserResponse, makeModelBaseOnQuery } from "@/utils/models";

type Props = {
  username: string;
};

export const getUsers = async (
  props: Props,
): Promise<ApiPaginateResponse<UserResponse[]>> => {
  const { username } = props;

  const apiModel = new User();

  const queryParams: QueryParams = {
    params: { search: username },
  };
  const model = makeModelBaseOnQuery(apiModel.list(), queryParams);

  const res = await model.get();
  return res.json();
};
