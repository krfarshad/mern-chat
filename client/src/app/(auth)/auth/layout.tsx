import { AuthLayout } from "@/features/auth";
import { PropsWithChildren } from "react";

type Props = {};
export default function RootLayout(props: PropsWithChildren<Props>) {
  const { children } = props;
  return <AuthLayout>{children}</AuthLayout>;
}
