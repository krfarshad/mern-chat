import { MessageResponse } from "@/utils/models";

type Props = {
  message: MessageResponse;
};
export const OtherMessage = (props: Props) => {
  const { message } = props;
  return <div>{message.text}</div>;
};
