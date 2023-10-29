export type UserType = {
  id: number;
  email: string;
  name: string;
  lastname: string;
  password?: string;
  state: boolean;
  roleId: number;
  role?: {
    id: number;
    name: string;
    permissions: Array<string>;
  };
};
