import { FontType, SizeType } from "@/app/styles/types";

export type MessageProps = {
  content: string;
  createdAt?: string;
  fontAnswer?: FontType;
  fontQuestion?: FontType;
  size?: SizeType;
  className?: string;
  isUserMessage: boolean;
};
