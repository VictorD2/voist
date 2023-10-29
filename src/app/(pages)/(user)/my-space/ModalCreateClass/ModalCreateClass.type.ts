"use client";
import { ClassType } from "@/app/shared/types/class.type";
import { UserType } from "@/app/shared/types/user.type";

export type ModalCreateClassType = {
  contactsSelected?: Array<Omit<UserType, "roleId" | "state">>;
  defaultValues?: Partial<ClassType>;
  onCreateClass?: (
    folder: Omit<
      ClassType,
      | "filename"
      | "createdAt"
      | "duration"
      | "resume"
      | "url_pdf"
      | "url_audio"
      | "userId"
    >,
    contacts: Array<Omit<UserType, "roleId" | "state">>,
    file: File | undefined | Blob
  ) => void;
  owner?: UserType;
  userId?: number;
};
