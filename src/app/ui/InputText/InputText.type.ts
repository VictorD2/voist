import {
  BackgroundColorType,
  SeparatorType,
  RoundedType,
  BorderType,
  ShadowType,
  FontType,
  SizeType,
} from "@/app/styles/types";
import { LabelProps } from "../Label/Label.type";
import { TextProps } from "../Text/Text.type";

export interface InputTextProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  bgColor?: BackgroundColorType;
  border?: BorderType;
  eventResponsiveIcon?: () => void;
  eventFloatIcon?: () => void;
  floatIcon?: string;
  font?: FontType;
  helpText?: TextProps;
  label?: LabelProps;
  orientation?: "horizontal" | "vertical";
  remixicon?: string;
  responsiveIcon?: string;
  rounded?: RoundedType;
  separator?: SeparatorType;
  shadow?: ShadowType;
  size?: SizeType;
}
