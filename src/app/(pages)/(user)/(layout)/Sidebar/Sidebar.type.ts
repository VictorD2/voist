import { Dispatch, SetStateAction } from "react";

export type SidebarProps = {
  setExpand?: Dispatch<SetStateAction<boolean>>;
  expand?: boolean;
};
