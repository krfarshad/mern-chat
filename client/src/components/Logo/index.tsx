import Link from "next/link";

export const Logo = () => {
  return (
    <>
      <Link
        href="/"
        className="flex h-10 w-10 items-center justify-center gap-1 rounded-2xl bg-indigo-100 text-indigo-700"
      >
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
      </Link>
      <h1 className="ml-2 text-2xl font-bold text-slate-400">MERN Chat</h1>
    </>
  );
};
