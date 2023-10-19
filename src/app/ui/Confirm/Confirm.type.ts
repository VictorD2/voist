import { Dispatch } from "react";

export type ConfirmProps = {
  buttonText?: string;
  message: string;
  title?: string;
  type?: "success" | "warning" | "danger" | "primary";
  onConfirm: () => void;
  open: boolean;
  setOpen: Dispatch<boolean>;
};
