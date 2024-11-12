import { ChatContent } from "../molecules/ChatContent";
import { Sidebar } from "../molecules/Sidebar";

export const HomePage = () => {
  return (
    <div className="flex h-screen items-center justify-center overflow-hidden bg-[#edf2f7]">
      <div className="flex h-screen text-gray-800 antialiased">
        <div className="flex h-full w-full flex-row overflow-x-hidden">
          <Sidebar />
          <ChatContent />
        </div>
      </div>
    </div>
  );
};
