import { BorderType, FontType, SeparatorType, ShadowType, SizeType } from "@/app/styles/types";
import { TextProps } from "../Text/Text.type";
import { LabelProps } from "../Label/Label.type";

export interface ComboBoxProps<T> {
  onChange: (value: any) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  name: string;
  value: T;
  id?: string;
  items: T[];
  orientation?: "horizontal" | "vertical";
  placeholder?: string;
  required?: boolean;
  labelField: keyof T;
  valueField: keyof T;
  classNameCaption?: string;
  className?: string;
  font?: FontType;
  shadow?: ShadowType;
  size?: SizeType;
  separator?: SeparatorType;
  helpText?: TextProps;
  label?: LabelProps;
  border?: BorderType;
}
