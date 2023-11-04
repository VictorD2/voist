// eslint-disable-next-line import/no-anonymous-default-export
export default {
  root: "/",
  register: "/register",
  login: "/login",
  perfil: "/perfil",
  changePassword: "/perfil/change-password",
  mySpace: "/my-space",
  classes: "/classes",
  shared: "/shared",
  contacts: "/contacts",
  class: (id: string) => `/classes/${id}`,
  classFolder: (id: string) => `/classes?folder=${id}`,
  adminHome: "/admin/home",
  panelUsers: "/admin/users",
  panelUsersId: (id: string) => `/admin/users/${id}`,
};
