import {
  BackgroundColorType,
  RoundedType,
  WidthType,
} from "../../styles/types";

export type ModalProps = {
  open: boolean;
  onClose: Function;
  children: React.ReactNode;
  width?: WidthType;
  overflowClosed?: boolean;
  header?: React.ReactNode;
  overlayBgColor?: BackgroundColorType;
  bgColor?: BackgroundColorType;
  rounded?: RoundedType;
};
