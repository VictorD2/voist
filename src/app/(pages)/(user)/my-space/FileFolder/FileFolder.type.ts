import { ButtonProps } from "@/app/ui/Button/Button.type";

export type FileFolderProps = {
  id: number;
  isFile: boolean;
  options?: Array<ButtonProps>;
  title: string;
  updatedAt: Date | string;
};
