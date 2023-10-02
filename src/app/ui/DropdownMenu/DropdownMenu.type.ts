import {
  BackgroundColorType,
  SeparatorType,
  SizeType,
} from "@/app/styles/types";
import { ReactNode } from "react";

export type DropdownMenuProps = {
  children: ReactNode;
  buttonNode: ReactNode;
  positionAbs?: string;
  bgColor?: BackgroundColorType;
  size?: SizeType;
  separator?: SeparatorType;
  show?: boolean;
};
