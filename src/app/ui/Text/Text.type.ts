import { HTMLAttributes, ReactNode } from "react";
import {
  DisplayType,
  FontType,
  SeparatorType,
  SizeType,
} from "@/app/styles/types";

export interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  className?: string;
  font?: FontType;
  text?: string;
  size?: SizeType;
  display?: DisplayType;
  children?: ReactNode;
  separator?: SeparatorType;
}
