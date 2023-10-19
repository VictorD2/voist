import { ClassType } from "@/app/shared/types/class.type";
import { UserType } from "@/app/shared/types/user.type";

export type ModalCreateClassType = {
  contactsSelected?: Array<UserType>;
  defaultValues?: Partial<ClassType>;
  onCreateClass?: (
    folder: Omit<ClassType, "filename" | "createdAt">,
    contacts: Array<UserType>,
    file: File | undefined
  ) => void;
  owner?: UserType;
  userId?: number;
};
