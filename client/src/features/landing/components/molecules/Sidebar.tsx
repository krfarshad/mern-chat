import Image from "next/image";
import profile from "../../assets/images/profile.jpg";

export const Sidebar = () => {
  return (
    <div className="flex w-64 flex-shrink-0 flex-col bg-white px-4 py-8">
      <div className="flex h-12 w-full flex-row items-center justify-center">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-700">
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            ></path>
          </svg>
        </div>
        <div className="ml-2 text-2xl font-bold">MERN Chat</div>
      </div>
      <div className="mt-4 flex w-full flex-col items-center rounded-lg border border-gray-200 bg-indigo-100 px-4 py-6">
        <div className="h-20 w-20 overflow-hidden rounded-full border">
          <Image
            src={profile.src}
            alt="profile"
            priority={false}
            width={80}
            height={80}
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="mt-2 text-sm font-semibold">Aminos Co.</div>
        <div className="text-xs text-gray-500">Be positive+</div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="flex flex-row items-center justify-between text-xs">
          <span className="font-bold">All conversations</span>
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-gray-300">
            4
          </span>
        </div>
        <div className="-mx-2 mt-4 flex max-h-80 flex-col space-y-1 overflow-y-auto">
          <button className="flex flex-row items-center rounded-xl p-2 hover:bg-gray-100">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-200">
              H
            </div>
            <div className="ml-2 text-sm font-semibold">Henry Boyd</div>
          </button>
          <button className="flex flex-row items-center rounded-xl p-2 hover:bg-gray-100">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200">
              M
            </div>
            <div className="ml-2 text-sm font-semibold">Marta Curtis</div>
            <div className="ml-auto flex h-4 w-4 items-center justify-center rounded bg-red-500 text-xs leading-none text-white">
              2
            </div>
          </button>
          <button className="flex flex-row items-center rounded-xl p-2 hover:bg-gray-100">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-200">
              P
            </div>
            <div className="ml-2 text-sm font-semibold">Philip Tucker</div>
          </button>
          <button className="flex flex-row items-center rounded-xl p-2 hover:bg-gray-100">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-200">
              C
            </div>
            <div className="ml-2 text-sm font-semibold">Christine Reid</div>
          </button>
          <button className="flex flex-row items-center rounded-xl p-2 hover:bg-gray-100">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-200">
              J
            </div>
            <div className="ml-2 text-sm font-semibold">Jerry Guzman</div>
          </button>
        </div>
      </div>
    </div>
  );
};
