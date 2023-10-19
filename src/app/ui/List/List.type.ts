import {
  BackgroundColorType,
  SeparatorType,
  FontType,
  SizeType,
} from "@/app/styles/types";

export type ListProps<T> = {
  bgColor?: BackgroundColorType;
  font?: FontType;
  gridColumns?: string;
  className?: string;
  isLoading?: boolean;
  list?: Array<T>;
  onSelectItem?: (item: T) => void;
  separator?: SeparatorType;
  size?: SizeType;
  values?: Array<keyof T>;
};
