import { PropsWithChildren } from "react";
import { Logo } from "@/components/Logo";
import dynamic from "next/dynamic";

const LazyBackground = dynamic(() => import("./Background"), { ssr: false });

export const AuthLayout = (props: PropsWithChildren) => {
  const { children } = props;
  return (
    <div className="flex min-h-screen flex-row">
      <div className="relative z-10 flex min-h-screen w-full flex-wrap items-center justify-center overflow-y-auto py-4">
        <div className="custom-gradient relative z-20 w-[380px] max-w-full rounded-2xl p-4 pb-10">
          <div className="flex items-center justify-center py-4 text-center">
            <Logo />
          </div>
          <div>
            <p className="mb-4 text-center text-sm leading-6 text-gray-100">
              Login to have access to all features.
            </p>
          </div>
          {children}
        </div>
        <LazyBackground />
      </div>
    </div>
  );
};
