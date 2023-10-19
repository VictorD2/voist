import {
  BorderType,
  FontType,
  SeparatorType,
  ShadowType,
  SizeType,
} from "@/app/styles/types";
import { LabelProps } from "../Label/Label.type";
import { TextProps } from "../Text/Text.type";

export const defaultSeparator: SeparatorType = {
  margin: "",
  padding: "px-3 py-1",
};

export const defaultHelpText: TextProps = {
  text: "",
  font: {
    color: "text-red-600",
    size: "text-sm",
    weight: "font-bold",
  },
  separator: {
    margin: "mt-1",
  },
  size: {
    height: "h-4",
  },
};

export const defaultLabel: LabelProps = {
  text: "",
  font: {
    color: "text-black",
    size: "text-sm",
    whiteSpace: "whitespace-nowrap",
    weight: "font-medium",
  },
  size: {
    width: "w-32",
  },
};

export const defaultBorder: BorderType = {
  color: "",
  focusColor: "focus:border-primary",
  hoverColor: "hover:border-primary",
  size: "border",
  style: "border-solid",
};

export const defaultShadow: ShadowType = {
  color: "shadow-primary",
  size: "shadow-none",
};

export const defaultSize: SizeType = {
  width: "w-full",
};

export const defaultFont: FontType = {
  color: "text-black",
};
