type Props = {
  chatItem: any;
};
export const ChatListItem = (props: Props) => {
  const { chatItem } = props;
  return (
    <button className="flex flex-row items-center rounded-xl p-2 hover:bg-gray-100">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200">
        M
      </div>
      <div className="ml-2 text-sm font-semibold">Marta Curtis</div>
      <div className="ml-auto flex h-4 w-4 items-center justify-center rounded bg-red-500 text-xs leading-none text-white">
        2
      </div>
    </button>
  );
};
