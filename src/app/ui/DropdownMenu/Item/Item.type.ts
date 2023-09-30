import { ReactNode } from "react";
import { ButtonProps } from "../../Button/Button.type";

export type ItemProps = {
  children?: ReactNode;
} & ButtonProps;
