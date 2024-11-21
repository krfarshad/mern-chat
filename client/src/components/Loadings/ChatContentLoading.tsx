import { Skeleton } from "@nextui-org/react";

export const ChatContentLoading = () => {
  return (
    <div className="h-full w-full">
      <Skeleton className="w-full">
        <div className="h-10 rounded-lg bg-default-300"></div>
      </Skeleton>
      <div className="flex flex-col gap-4">
        <div className="flex w-2/3 justify-end">
          <Skeleton className="w-full">
            <div className="h-10 rounded-lg bg-default-300"></div>
          </Skeleton>
        </div>
        <div className="flex w-1/3 justify-start">
          <Skeleton className="w-full">
            <div className="h-10 rounded-lg bg-default-300"></div>
          </Skeleton>
        </div>
      </div>
      <Skeleton className="w-full">
        <div className="h-10 rounded-lg bg-default-300"></div>
      </Skeleton>
    </div>
  );
};
