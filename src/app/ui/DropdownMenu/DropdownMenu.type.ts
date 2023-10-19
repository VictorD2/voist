import {
  BackgroundColorType,
  SeparatorType,
  SizeType,
} from "@/app/styles/types";
import { ReactNode } from "react";

export type DropdownMenuProps = {
  bgColor?: BackgroundColorType;
  buttonNode: ReactNode;
  children: ReactNode;
  positionAbs?: string;
  separator?: SeparatorType;
  size?: SizeType;
  show?: boolean;
};
