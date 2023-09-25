import {
  BackgroundColorType,
  BorderType,
  FontType,
  RoundedType,
  SeparatorType,
  ShadowType,
  SizeType,
} from "@/app/styles/types";
import { LabelProps } from "../Label/Label.type";
import { TextProps } from "../Text/Text.type";

export interface InputTextProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  bgColor?: BackgroundColorType;
  border?: BorderType;
  eventResponsiveIcon?: () => void;
  helpText?: TextProps;
  label?: LabelProps;
  orientation?: "horizontal" | "vertical";
  remixicon?: string;
  responsiveIcon?: string;
  shadow?: ShadowType;
  rounded?: RoundedType;
  font?: FontType;
  size?: SizeType;
  separator?: SeparatorType;
}
