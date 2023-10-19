import { ElementType, HTMLAttributes, ReactNode } from "react";
import {
  BackgroundColorType,
  FlexDirectionType,
  SeparatorType,
  FlexWrapType,
  PositionType,
  DisplayType,
  RoundedType,
  JustifyType,
  BorderType,
  ShadowType,
  AlignType,
  SizeType,
  FontType,
  GapType,
} from "../../styles/types";

export interface ContainerProps extends HTMLAttributes<HTMLElement> {
  align?: AlignType;
  as?: ElementType;
  bgColor?: BackgroundColorType;
  border?: BorderType;
  children?: ReactNode;
  className?: string;
  display?: DisplayType;
  flexDirection?: FlexDirectionType;
  flexWrap?: FlexWrapType;
  font?: FontType;
  justify?: JustifyType;
  gap?: GapType;
  position?: PositionType;
  rounded?: RoundedType;
  separator?: SeparatorType;
  shadow?: ShadowType;
  size?: SizeType;
  transition?: boolean;
}
