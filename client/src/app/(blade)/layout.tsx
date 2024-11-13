import { ChatLayout } from "@/layout";
import { PropsWithChildren } from "react";

export default function Layout(props: PropsWithChildren) {
  const { children } = props;
  return <ChatLayout>{children}</ChatLayout>;
}
