import { ItemGroupType } from "@/app/(pages)/(user)/(layout)/Sidebar/ItemGroup/ItemGroup.type";
import pathsRouter from "./paths";

export const pathsAdmin: Array<ItemGroupType> = [
  {
    separator: "",
    items: [
      {
        slug: "Inicio",
        link: pathsRouter.adminHome,
        remixicon: "ri-home-5-line",
        code: "P05",
        children: [],
      },
      {
        slug: "Gestión de Usuarios",
        link: pathsRouter.panelUsers,
        remixicon: "ri-user-line",
        code: "P06",
        children: [],
      },
    ],
  },
];
