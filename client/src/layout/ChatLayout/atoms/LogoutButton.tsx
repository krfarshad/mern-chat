"use client";
import { signOut } from "next-auth/react";
import { memo } from "react";

const LogoutButton = () => {
  const logoutHandler = async () => {
    const currentPath = window.location.href;

    await signOut({ callbackUrl: encodeURIComponent(currentPath) });
  };

  return (
    <button
      onClick={logoutHandler}
      className="flex-1 rounded-md bg-slate-200 px-4 py-2 text-sm text-slate-800"
    >
      Logout
    </button>
  );
};

export default memo(LogoutButton);
