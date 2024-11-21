import { Button } from "@nextui-org/react";
import { InfoCircle } from "iconsax-react";

type Props = {
  onClick: any;
};
export const Refetch = (props: Props) => {
  const { onClick } = props;
  return (
    <div className="w-full p-8 text-center">
      <Button
        color="primary"
        onClick={onClick}
        variant="shadow"
        startContent={<InfoCircle size="20" color="#555" />}
      >
        Refetch again
      </Button>
    </div>
  );
};
