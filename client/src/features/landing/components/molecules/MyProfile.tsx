"use client";
import Image from "next/image";
import profile from "../../assets/images/profile.jpg";
import { useSession } from "next-auth/react";

export const MyProfile = () => {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <span>loading...</span>;
  }
  return (
    <>
      {status === "authenticated" && (
        <div className="mt-4 flex w-full flex-col items-center rounded-lg border border-gray-200 bg-indigo-100 px-4 py-6">
          <div className="h-20 w-20 overflow-hidden rounded-full border">
            <Image
              src={session.user.avatar}
              alt={session.user.username}
              priority={false}
              width={80}
              height={80}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="mt-2 text-base font-semibold uppercase text-gray-800">
            {session.user.displayName}
          </div>
          <div className=" text-sm text-gray-500">@{session.user.username}</div>
          <div className="text-xs text-gray-500">{session.user.bio}</div>
        </div>
      )}
    </>
  );
};
