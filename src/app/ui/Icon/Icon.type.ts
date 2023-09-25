import { FontType, SizeType } from "../../styles/types";

export interface IconProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > {
  className?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
  remixicon: string;
  size?: SizeType;
  font?: FontType;
}
