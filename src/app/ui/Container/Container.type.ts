import { ElementType, HTMLAttributes, ReactNode } from "react";
import {
  AlignType,
  BackgroundColorType,
  DisplayType,
  FlexDirectionType,
  GapType,
  JustifyType,
  FlexWrapType,
  PositionType,
  RoundedType,
  BorderType,
  FontType,
  SeparatorType,
  ShadowType,
  SizeType,
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
}
