import { Item } from "./Item/item.type";

export type ItemGroupProps = {
  separator: string;
  items: Array<Item>;
  expand: boolean;
};

export type ItemGroupType = Omit<ItemGroupProps, "expand">;
