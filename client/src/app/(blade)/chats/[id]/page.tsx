import { ChatContent } from "@/features/chat";

type Props = {
  params: {
    id: string;
  };
};
export default function Page(props: Props) {
  const { params } = props;
  return <ChatContent id={params.id} />;
}
