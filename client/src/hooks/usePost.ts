import { ApiResponse } from "@/types";
import {
  MutationFunction,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

export type Props<Tc, Tcres> = {
  postFn: MutationFunction<ApiResponse<Tcres>, Tc>;
  queryKey?: string[];
};

const usePost = <Tc = undefined, Tcres = undefined>(
  props: Props<Tc, Tcres>,
) => {
  const { postFn, queryKey } = props;
  const queryClient = useQueryClient();

  const postMutation = useMutation({
    mutationFn: postFn,
    onSuccess: (res: ApiResponse<Tcres>) => {
      queryKey && queryClient.invalidateQueries({ queryKey });
    },
    onError: () => {},
  });

  const post = async (values: Tc) => {
    try {
      const data = await postMutation.mutateAsync(values);
      return { data, isLoading: false, isSuccess: true, isError: false };
    } catch (error: any) {
      return {
        data: null,
        isLoading: false,
        isSuccess: false,
        isError: true,
        error,
      };
    }
  };

  return { post, ...postMutation };
};

export default usePost;
