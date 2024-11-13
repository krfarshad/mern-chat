type Props = {
  id: string;
};
export const MessageItems = (props: Props) => {
  const { id } = props;

  return (
    <>
      <div className="col-start-1 col-end-8 rounded-lg p-3">
        <div className="flex flex-row items-center">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-500">
            A
          </div>
          <div className="relative ml-3 rounded-xl bg-white px-4 py-2 text-sm shadow">
            <div>Hey How are you today?</div>
          </div>
        </div>
      </div>
      <div className="col-start-1 col-end-8 rounded-lg p-3">
        <div className="flex flex-row items-center">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-500">
            A
          </div>
          <div className="relative ml-3 rounded-xl bg-white px-4 py-2 text-sm shadow">
            <div>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel ipsa
              commodi illum saepe numquam maxime asperiores voluptate sit,
              minima perspiciatis.
            </div>
          </div>
        </div>
      </div>
      <div className="col-start-6 col-end-13 rounded-lg p-3">
        <div className="flex flex-row-reverse items-center justify-start">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-500">
            A
          </div>
          <div className="relative mr-3 rounded-xl bg-indigo-100 px-4 py-2 text-sm shadow">
            <div>I'm ok what about you?</div>
          </div>
        </div>
      </div>
      <div className="col-start-6 col-end-13 rounded-lg p-3">
        <div className="flex flex-row-reverse items-center justify-start">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-500">
            A
          </div>
          <div className="relative mr-3 rounded-xl bg-indigo-100 px-4 py-2 text-sm shadow">
            <div>Lorem ipsum dolor sit, amet consectetur adipisicing. ?</div>
          </div>
        </div>
      </div>
      <div className="col-start-1 col-end-8 rounded-lg p-3">
        <div className="flex flex-row items-center">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-500">
            A
          </div>
          <div className="relative ml-3 rounded-xl bg-white px-4 py-2 text-sm shadow">
            <div>Lorem ipsum dolor sit amet !</div>
          </div>
        </div>
      </div>
      <div className="col-start-6 col-end-13 rounded-lg p-3">
        <div className="flex flex-row-reverse items-center justify-start">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-500">
            A
          </div>
          <div className="relative mr-3 rounded-xl bg-indigo-100 px-4 py-2 text-sm shadow">
            <div>Lorem ipsum dolor sit, amet consectetur adipisicing. ?</div>
            <div className="absolute bottom-0 right-0 -mb-5 mr-2 text-xs text-gray-500">
              Seen
            </div>
          </div>
        </div>
      </div>
      <div className="col-start-1 col-end-8 rounded-lg p-3">
        <div className="flex flex-row items-center">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-500">
            A
          </div>
          <div className="relative ml-3 rounded-xl bg-white px-4 py-2 text-sm shadow">
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Perspiciatis, in.
            </div>
          </div>
        </div>
      </div>
      <div className="col-start-1 col-end-8 rounded-lg p-3">
        <div className="flex flex-row items-center">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-500">
            A
          </div>
          <div className="relative ml-3 rounded-xl bg-white px-4 py-2 text-sm shadow">
            <div className="flex flex-row items-center">
              <button className="flex h-8 w-10 items-center justify-center rounded-full bg-indigo-600 hover:bg-indigo-800">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </button>
              <div className="ml-4 flex flex-row items-center space-x-px">
                <div className="h-2 w-1 rounded-lg bg-gray-500"></div>
                <div className="h-2 w-1 rounded-lg bg-gray-500"></div>
                <div className="h-4 w-1 rounded-lg bg-gray-500"></div>
                <div className="h-8 w-1 rounded-lg bg-gray-500"></div>
                <div className="h-8 w-1 rounded-lg bg-gray-500"></div>
                <div className="h-10 w-1 rounded-lg bg-gray-500"></div>
                <div className="h-10 w-1 rounded-lg bg-gray-500"></div>
                <div className="h-12 w-1 rounded-lg bg-gray-500"></div>
                <div className="h-10 w-1 rounded-lg bg-gray-500"></div>
                <div className="h-6 w-1 rounded-lg bg-gray-500"></div>
                <div className="h-5 w-1 rounded-lg bg-gray-500"></div>
                <div className="h-4 w-1 rounded-lg bg-gray-500"></div>
                <div className="h-3 w-1 rounded-lg bg-gray-500"></div>
                <div className="h-2 w-1 rounded-lg bg-gray-500"></div>
                <div className="h-2 w-1 rounded-lg bg-gray-500"></div>
                <div className="h-2 w-1 rounded-lg bg-gray-500"></div>
                <div className="h-10 w-1 rounded-lg bg-gray-500"></div>
                <div className="h-2 w-1 rounded-lg bg-gray-500"></div>
                <div className="h-10 w-1 rounded-lg bg-gray-500"></div>
                <div className="h-8 w-1 rounded-lg bg-gray-500"></div>
                <div className="h-8 w-1 rounded-lg bg-gray-500"></div>
                <div className="h-1 w-1 rounded-lg bg-gray-500"></div>
                <div className="h-1 w-1 rounded-lg bg-gray-500"></div>
                <div className="h-2 w-1 rounded-lg bg-gray-500"></div>
                <div className="h-8 w-1 rounded-lg bg-gray-500"></div>
                <div className="h-8 w-1 rounded-lg bg-gray-500"></div>
                <div className="h-2 w-1 rounded-lg bg-gray-500"></div>
                <div className="h-2 w-1 rounded-lg bg-gray-500"></div>
                <div className="h-2 w-1 rounded-lg bg-gray-500"></div>
                <div className="h-2 w-1 rounded-lg bg-gray-500"></div>
                <div className="h-4 w-1 rounded-lg bg-gray-500"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
