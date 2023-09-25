import { FontType, SeparatorType, SizeType } from "@/app/styles/types";
import { ReactNode } from "react";

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  className?: string;
  children?: ReactNode;
  font?: FontType;
  text?: string;
  size?: SizeType;
  separator?: SeparatorType;
}
