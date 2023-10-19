import { FolderType } from "@/app/shared/types/folder.type";
import { UserType } from "@/app/shared/types/user.type";

export type ModalCreateFolderType = {
  contactsSelected?: Array<UserType>;
  defaultValues?: Partial<FolderType>;
  onCreateFolder?: (folder: FolderType, contacts: Array<UserType>) => void;
  owner?: UserType;
  userId?: number;
};
