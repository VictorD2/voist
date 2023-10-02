"use client";

import Container from "@/app/ui/Container";
import { FC, useState } from "react";
import { FileFolderProps } from "./FileFolder.type";
import Icon from "@/app/ui/Icon";
import Text from "@/app/ui/Text";
import moment from "moment";
import DropdownMenu from "@/app/ui/DropdownMenu";
import { ButtonProps } from "@/app/ui/Button/Button.type";
import Item from "@/app/ui/DropdownMenu/Item";
import { useRouter } from "next/navigation";
import paths from "@/app/shared/routes/paths";

const FileFolder: FC<FileFolderProps> = (props) => {
  const { id, title, updatedAt, isFile } = props;

  const menuOptionsItems: Array<ButtonProps> = [
    {
      text: "Ver detalle",
      font: {
        size: "text-sm",
      },
    },
    {
      text: "Editar Configuración",
      font: {
        size: "text-sm",
      },
      // onClick: handleOpenModalCreate,
    },
    {
      text: "Eliminar",
      bgColor: "bg-red-400 hover:bg-red-500",
      font: {
        size: "text-sm",
        color: "text-white",
      },
      // onClick: handleOpenModalCreate,
    },
  ];

  const router = useRouter();

  const handleClickFileFolder = () => {
    if (isFile) router.push(paths.class(String(id)));
  };

  return (
    <Container
      size={{ width: "lg:w-80 md:w-80 w-full" }}
      separator={{ padding: "p-5" }}
      rounded="rounded-lg"
      display="flex"
      flexDirection="flex-row"
      flexWrap="flex-nowrap"
      justify="justify-between"
      gap="gap-5"
      transition
      bgColor="hover:bg-gray-300 bg-gray-200"
    >
      <Container onClick={handleClickFileFolder} className="cursor-pointer">
        <Icon
          font={{
            color: isFile ? "text-primary" : "text-gray-500",
            size: "text-5xl",
          }}
          remixicon={isFile ? "ri-file-3-fill" : "ri-folder-fill"}
        />
      </Container>
      <Container className="overflow-hidden">
        <Text
          text={title}
          font={{
            wordBreak: "break-keep",
            weight: "font-semibold",
            whiteSpace: "whitespace-nowrap",
          }}
        />
        <Text
          font={{
            whiteSpace: "whitespace-nowrap",
            wordBreak: "break-keep",
          }}
          text={`Ult. act: ${moment(updatedAt).format("DD/MM/YYYY")}`}
        />
      </Container>

      <DropdownMenu
        bgColor="bg-transparent"
        size={{ width: "w-44" }}
        positionAbs="-top-1 -right-[10.7rem]"
        buttonNode={
          <Icon
            className="cursor-pointer"
            remixicon="ri-more-2-line"
            font={{ size: "text-xl" }}
          />
        }
      >
        {menuOptionsItems.map((item, i) => {
          return <Item {...item} key={"item-menu-options-" + i} gap="gap-2" />;
        })}
      </DropdownMenu>
    </Container>
  );
};

export default FileFolder;
