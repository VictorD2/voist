import { FolderType } from "@/app/shared/types/folder.type";
import { UserType } from "@/app/shared/types/user.type";

export type ModalCreateFolderType = {
  contactsSelected?: Array<Omit<UserType, "roleId" | "state">>;
  defaultValues?: Partial<FolderType>;
  onCreateFolder?: (folder: FolderType, contacts: Array<Omit<UserType, "role" | "roleId" | "state">>) => void;
  owner?: UserType;
  userId?: number;
};
