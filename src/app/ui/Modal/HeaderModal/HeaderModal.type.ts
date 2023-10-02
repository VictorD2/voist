import {
  BackgroundColorType,
  FontType,
  SeparatorType,
  SizeType,
} from "../../../styles/types";

export type HeaderModalProps = {
  bgColor?: BackgroundColorType;
  remixicon?: string;
  text?: string;
  xIcon?: boolean;
  onClose: Function;
  separator?: SeparatorType;
  font?: FontType;
  size?: SizeType;
};
