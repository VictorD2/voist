import {
  BackgroundColorType,
  RoundedType,
  WidthType,
} from "../../styles/types";

export type ModalProps = {
  bgColor?: BackgroundColorType;
  children: React.ReactNode;
  header?: React.ReactNode;
  rounded?: RoundedType;
  onClose: Function;
  open: boolean;
  overflowClosed?: boolean;
  overlayBgColor?: BackgroundColorType;
  width?: WidthType;
};
