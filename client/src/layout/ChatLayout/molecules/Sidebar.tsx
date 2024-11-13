import { Logo } from "@/components";
import { MyProfile } from "./MyProfile";
import { ChatList } from "./ChatList";

export const Sidebar = () => {
  return (
    <div className="flex w-64 flex-shrink-0 flex-col bg-white px-4 py-8">
      <div className="flex h-12 w-full flex-row items-center justify-center">
        <Logo />
      </div>
      <MyProfile />
      <div className="mt-8 flex flex-col">
        <div className="flex flex-row items-center justify-between text-xs">
          <span className="font-bold">All conversations</span>
          {/* unread messages count */}
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-gray-300">
            4
          </span>
        </div>
        <div className="-mx-2 mt-4 flex max-h-80 flex-col space-y-1 overflow-y-auto">
          <ChatList />
        </div>
      </div>
    </div>
  );
};
