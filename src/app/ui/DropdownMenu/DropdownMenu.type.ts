import { BackgroundColorType, SizeType } from "@/app/styles/types";
import { ReactNode } from "react";

export type DropdownMenuProps = {
  children: ReactNode;
  buttonNode: ReactNode;
  bgColor?: BackgroundColorType;
  size?: SizeType;
};
