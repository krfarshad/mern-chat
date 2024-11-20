type CreateChatProps = {
  type: "group" | "private";
  participants: string[];
  name: string;
  avatar?: any;
};
