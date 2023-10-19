import { Dispatch, SetStateAction } from "react";
import { Item } from "./Item/item.type";

export type ItemGroupProps = {
  separator: string;
  items: Array<Item>;
  expand: boolean;
  setExpand?: Dispatch<SetStateAction<boolean>>;
};

export type ItemGroupType = Omit<ItemGroupProps, "expand">;
