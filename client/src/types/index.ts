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
