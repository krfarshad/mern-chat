import { MessageResponse } from "@/utils/models";
import { Card, CardBody } from "@nextui-org/react";

type Props = {
  message: MessageResponse;
};
export const OtherMessage = (props: Props) => {
  const { message } = props;
  const { text, createdAt, sender } = message;
  return (
    <div className="my-2 flex items-end justify-start px-0.5 light">
      <Card shadow="sm" className="mx-1 max-w-sm bg-white">
        <CardBody>
          <div>
            <p className="text-light word-wrap mt-2 text-sm">{text}</p>
          </div>
        </CardBody>
      </Card>
      <p className="text-[10px] text-gray-600">
        {new Date(createdAt).toLocaleTimeString()}
      </p>
    </div>
  );
};
