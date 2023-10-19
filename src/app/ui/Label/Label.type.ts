import { FontType, SeparatorType, SizeType } from "@/app/styles/types";
import { ReactNode } from "react";

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children?: ReactNode;
  className?: string;
  font?: FontType;
  separator?: SeparatorType;
  size?: SizeType;
  text?: string;
}
