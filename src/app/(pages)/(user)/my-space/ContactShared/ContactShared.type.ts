export type ContactSharedProps = {
  id: number;
  name: string;
  lastname: string;
  email: string;
  isOwner: boolean;
  onDelete?: (id: number) => void;
};
