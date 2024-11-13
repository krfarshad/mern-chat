export const ChatList = () => {
  return (
    <>
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
    </>
  );
};
