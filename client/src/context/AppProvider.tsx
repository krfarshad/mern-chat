"use client";
import { NetworkStatus } from "@/features/error";
import { ChildrenProps } from "@/types";
import NextTopLoader from "nextjs-toploader";
import { memo } from "react";
import { NextAuthProvider } from "./AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Flip, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Props extends ChildrenProps {}

const AppProvider = (props: Props) => {
  const { children } = props;

  const queryClient = new QueryClient();
  return (
    <NextAuthProvider>
      <QueryClientProvider client={queryClient}>
        <NextTopLoader color={`var(--primary)`} showSpinner={false} />
        {children}
        <NetworkStatus />
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          limit={3}
          pauseOnHover
          theme="light"
          transition={Flip}
          className="md:text-md text-sm"
        />
      </QueryClientProvider>
    </NextAuthProvider>
  );
};

export default memo(AppProvider);
