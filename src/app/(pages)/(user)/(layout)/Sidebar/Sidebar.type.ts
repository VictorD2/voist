import { Dispatch, SetStateAction } from "react";
import { ItemGroupType } from "./ItemGroup/ItemGroup.type";

export type SidebarProps = {
  setExpand?: Dispatch<SetStateAction<boolean>>;
  expand?: boolean;
  items?: Array<ItemGroupType>;
};
