import { Dispatch, ReactNode, SetStateAction } from "react";

export * from "./api";

export interface ChildrenProps {
  children: ReactNode;
}

export interface ChildrenOptionalProps {
  children?: ReactNode;
}

export interface ClassNameProps {
  className: string;
}
export interface ClassNameOptionalProps {
  className?: string;
}
export type setStateProp<T> = Dispatch<SetStateAction<T>>;

export type OptionProp = {
  label: string;
  value: any;
};

export type Message = {
  id: number;
  type: "action" | "text";
  sender: Pick<User, "id" | "username" | "avatar">;
  text: string;
  createdAt: Date;
  Attachment: File;
};

export type User = {
  id: number;
  username: string;
  email: string;
  displayName?: string;
  bio?: string;
  password: string;
  avatar: string;
  status: "online" | "offline" | "busy" | "away";
  lastSeen: Date;
  createdAt: Date;
  updateAt: Date;
};

export type ChatParticipants = Pick<User, "id" | "username" | "avatar">[];

export type Chat = {
  id: number;
  type: "private" | "group";
  participants: Pick<User, "id" | "username" | "avatar">[];
  name: string;
  avatar: string;
  admin: Pick<User, "id" | "username" | "avatar">;
  lastMessage: Pick<Message, "id" | "text" | "sender" | "createdAt">;
  isMember: boolean;
  isAdmin: boolean;
};
