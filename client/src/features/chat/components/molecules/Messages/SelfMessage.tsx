import { MessageResponse } from "@/utils/models";
import { timeFormatter } from "@/utils/timeFormatter";
import { Card, CardBody } from "@nextui-org/react";

type Props = {
  message: MessageResponse;
};
export const SelfMessage = (props: Props) => {
  const { message } = props;
  const { text, createdAt } = message;
  return (
    <div className="my-2 flex items-end justify-end px-0.5 light">
      <p className="mr-1 text-[10px] text-gray-600">
        {timeFormatter(createdAt)}
      </p>
      <Card shadow="sm" className="max-w-sm bg-primary">
        <CardBody>
          <div>
            <p className="text-light word-wrap mt-2 text-sm">{text}</p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
