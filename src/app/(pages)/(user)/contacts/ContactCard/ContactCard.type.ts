import { UserType } from "@/app/shared/types/user.type";

export type ContactCardProps = {
  onDelete: (user: UserType) => void;
  lastname: string;
  email: string;
  name: string;
  id: number;
};
