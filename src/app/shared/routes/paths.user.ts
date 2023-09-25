import { ItemGroupType } from "@/app/(pages)/(user)/(layout)/Sidebar/ItemGroup/ItemGroup.type";
import pathsRouter from "./paths";

export const paths: Array<ItemGroupType> = [
  {
    separator: "",
    items: [
      {
        slug: "Mi unidad",
        link: pathsRouter.mySpace,
        remixicon: "ri-home-5-line",
        code: "P02",
        children: [],
      },
      {
        slug: "Mis clases",
        link: pathsRouter.classes,
        remixicon: "ri-folder-line",
        code: "P03",
        children: [],
      },
      {
        slug: "Compartido conmigo",
        link: pathsRouter.shared,
        remixicon: "ri-cloud-line",
        code: "P04",
        children: [],
      },
      {
        slug: "Mis contactos",
        link: pathsRouter.contacts,
        remixicon: "ri-contacts-book-line",
        code: "P05",
        children: [],
      },
    ],
  },
];
