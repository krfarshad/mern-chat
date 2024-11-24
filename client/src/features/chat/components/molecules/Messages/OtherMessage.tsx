import { MessageResponse } from "@/utils/models";
import { timeFormatter } from "@/utils/timeFormatter";
import { Card, CardBody } from "@nextui-org/react";

type Props = {
  message: MessageResponse;
};
export const OtherMessage = (props: Props) => {
  const { message } = props;
  const { text, createdAt, sender } = message;
  return (
    <div className="my-2  px-0.5 light">
      <div className="flex max-w-sm flex-wrap justify-start">
        <p className="text-light word-wrap mt-2 w-full px-1 text-xs font-bold">
          {sender.username}:
        </p>
        <div className="flex items-end">
          <Card shadow="sm" className="mx-1 bg-white">
            <CardBody>
              <div className="min-w-20">
                <p className="text-light word-wrap mt-2 text-sm">{text}</p>
              </div>
            </CardBody>
          </Card>
          <p className="text-[10px] text-gray-600">
            {timeFormatter(createdAt)}
          </p>
        </div>
      </div>
    </div>
  );
};
