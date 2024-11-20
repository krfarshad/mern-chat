import { MessageResponse } from "@/utils/models";
import { Card, CardBody, CardFooter } from "@nextui-org/react";

type Props = {
  message: MessageResponse;
};
export const SelfMessage = (props: Props) => {
  const { message } = props;
  const { text, createdAt } = message;
  return (
    <div className="my-2 flex items-end justify-end light">
      <p className="mr-1 text-[10px] text-gray-600">
        {new Date(createdAt).toLocaleTimeString()}
      </p>
      <Card shadow="sm" className="max-w-sm bg-primary">
        <CardBody>
          <div>
            <p className="text-light word-wrap mt-2">{text}</p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
