import { UserType } from "@/app/shared/types/user.type";

export type ContactCardProps = {
  onDelete: (user: Omit<UserType, "state" | "role" | "roleId">) => void;
  lastname: string;
  email: string;
  name: string;
  id: number;
};
