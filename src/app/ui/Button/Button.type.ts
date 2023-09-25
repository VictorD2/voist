import { MouseEventHandler } from "react";
import {
  BackgroundColorType,
  BorderType,
  FontType,
  JustifyType,
  RoundedType,
  SeparatorType,
  ShadowType,
  SizeType,
} from "../../styles/types";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  bgColor?: BackgroundColorType;
  border?: BorderType;
  font?: FontType;
  size?: SizeType;
  justify?: JustifyType;
  loading?: boolean;
  separator?: SeparatorType;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  remixicon?: string;
  trailRemixicon?: string;
  ripples?: boolean;
  rounded?: RoundedType;
  shadow?: ShadowType;
  text?: string;
  textLoading?: string;
  responsible?: boolean;
  toggle?: boolean;
  animateLoading?: "animate-pulse" | "animate-spin";
}
