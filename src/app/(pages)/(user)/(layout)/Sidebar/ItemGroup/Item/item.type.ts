export type Item = {
  slug: string;
  link: string | "#";
  remixicon: string;
  code?: string;
  children: Array<Item>;
};

export type ItemProps = {
  slug: string;
  link: string;
  bgActive?: string;
  code?: string;
  colorActive?: string;
  first?: boolean;
  gapTextIcon?: string;
  marginLeft?: number;
  remixicon?: string;
  bgHover?: string;
  textColor?: string;
  textHover?: string;
  iconSize?: string;
  setDrawer?: Function;
  sons: Array<Item>;
  expand?: boolean;
  onClick?: React.MouseEventHandler<any>;
};
