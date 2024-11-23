import { PropsWithChildren } from "react";
import { Sidebar } from "./molecules/Sidebar";
import { SocketProvider } from "@/context/SocketProvider";

export const ChatLayout = (props: PropsWithChildren) => {
  const { children } = props;
  return (
    <div className="flex h-screen items-center justify-center overflow-hidden bg-[#edf2f7]">
      <div className="flex h-screen w-full text-gray-800 antialiased">
        <div className="flex h-full w-full flex-row overflow-x-hidden">
          <SocketProvider>
            <Sidebar />
            <div className="flex h-full flex-auto flex-col ">
              <div className="flex h-full flex-auto flex-shrink-0 flex-col rounded-2xl bg-gray-100">
                {children}
              </div>
            </div>
          </SocketProvider>
        </div>
      </div>
    </div>
  );
};
