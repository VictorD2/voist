import { MouseEventHandler } from "react";
import {
  AlignType,
  BackgroundColorType,
  BorderType,
  DisplayType,
  FlexDirectionType,
  FlexWrapType,
  FontType,
  GapType,
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
  transition?: Boolean;
  trailRemixicon?: string;
  ripples?: boolean;
  gap?: GapType;
  rounded?: RoundedType;
  flexDirection?: FlexDirectionType;
  flexWrap?: FlexWrapType;
  align?: AlignType;
  display?: DisplayType;
  shadow?: ShadowType;
  text?: string;
  textLoading?: string;
  responsible?: boolean;
  toggle?: boolean;
  animateLoading?: "animate-pulse" | "animate-spin";
}
