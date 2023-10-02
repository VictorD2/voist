"use client";
import { NextPage } from "next";
import FileFolder from "../my-space/FileFolder";
import folderFileList from "./fileFolderList.json";
import paths from "@/app/shared/routes/paths";
import Breadcrumbs from "@/app/ui/Breadcrumbs";
import InputText from "@/app/ui/InputText";
import Container from "@/app/ui/Container";
import Button from "@/app/ui/Button";
import { useState } from "react";
import DropdownMenu from "@/app/ui/DropdownMenu";
import Item from "@/app/ui/DropdownMenu/Item";
import { ButtonProps } from "@/app/ui/Button/Button.type";
import Modal from "@/app/ui/Modal";
import ModalCreateFolder from "../my-space/ModalCreateFolder";
import Text from "@/app/ui/Text";
import Icon from "@/app/ui/Icon";

const ClassesPage: NextPage = () => {
  const [isActived, setIsActived] = useState<boolean>(false);
  const [showModalAdd, setShowModalAdd] = useState<boolean>(false);
  const [showMenuAdd, setMenuModalAdd] = useState<boolean>(false);

  const handleModalClose = () => setShowModalAdd(false);
  const handleOpenModalCreate = () => {
    setMenuModalAdd(false);
    setShowModalAdd(true);
  };

  const menuAddItems: Array<ButtonProps> = [
    {
      text: "Iniciar grabación",
      remixicon: "ri-mic-line",
      font: {
        size: "text-sm",
      },
    },
    {
      text: "Crear carpeta",
      remixicon: "ri-folder-add-line",
      font: {
        size: "text-sm",
      },
      onClick: handleOpenModalCreate,
    },
  ];

  return (
    < >
      <Container
        size={{ width: "w-full" }}
        display="flex"
        flexDirection="flex-col"
        gap="gap-5"
      >
        {/* Search */}
        <Container
          size={{ width: "w-full" }}
          display="flex"
          flexDirection="flex-row"
          justify="justify-center"
          separator={{ padding: "p-1" }}
        >
          <InputText
            placeholder="Buscar..."
            size={{ width: "lg:w-5/12 md:w-7/12 w-full" }}
            responsiveIcon="ri-search-line"
          />
        </Container>

        {/* Breadcrumbs */}
        <Breadcrumbs routes={[{ link: paths.classes, name: "Mis clases" }]} />
      </Container>

      {/* Actions */}
      <Container
        separator={{ margin: "mt-10" }}
        size={{ width: "w-full" }}
        display="flex"
        flexDirection="flex-row"
        flexWrap="flex-nowrap"
        gap="gap-4"
      >
        <DropdownMenu
          show={showMenuAdd}
          bgColor="bg-transparent"
          size={{ width: "w-44" }}
          positionAbs="-top-1 -right-[10.7rem]"
          buttonNode={
            <Button
              ripples={false}
              onClick={() => setMenuModalAdd((state) => !state)}
              text="Nuevo"
              remixicon="ri-add-line"
              size={{ width: "" }}
              font={{ color: "group-hover:text-white text-black" }}
              transition
              className="group"
              bgColor="bg-white hover:bg-primary"
              border={{ size: "border", color: "border-gray-200" }}
            />
          }
        >
          {menuAddItems.map((item, i) => {
            return <Item {...item} key={"item-menu-add-" + i} gap="gap-2" />;
          })}
        </DropdownMenu>

        <Button
          ripples={false}
          size={{ width: "" }}
          text="Añadir filtros"
          remixicon="ri-filter-line"
          bgColor="bg-white"
          border={{ size: "border", color: "border-gray-200" }}
        />

        <Button
          ripples={false}
          text="Ordenar por más recientes"
          size={{ width: "" }}
          toggle={isActived}
          onClick={() => {
            setIsActived((state) => !state);
          }}
          remixicon="ri-sort-desc"
          bgColor="bg-white"
          border={{ size: "border", color: "border-gray-200" }}
        />
      </Container>

      {/* List */}
      <Container
        separator={{ margin: "mt-10" }}
        display="flex"
        flexDirection="flex-row"
        flexWrap="flex-wrap"
        justify="justify-evenly"
        gap="gap-10"
      >
        {folderFileList.map((item) => {
          return <FileFolder {...item} key={item.id + item.title} />;
        })}
      </Container>
      <Modal
        onClose={handleModalClose}
        open={showModalAdd}
        overflowClosed
        rounded="rounded-2xl"
        width="lg:w-5/12 md:w-8/12 w-full"
        header={
          <>
            <Container
              display="flex"
              justify="justify-end"
              separator={{ padding: "px-10 pt-2" }}
            >
              <Icon
                onClick={handleModalClose}
                className="cursor-pointer"
                remixicon="ri-close-line"
                font={{ size: "text-4xl", color: "text-gray-400" }}
              />
            </Container>
            <Container
              display="flex"
              flexDirection="flex-row"
              flexWrap="flex-nowrap"
              justify="justify-center"
              align="items-center"
              gap="gap-5"
            >
              <Text
                size={{ width: "" }}
                text="Carpeta 1"
                font={{ size: "text-2xl", weight: "font-semibold" }}
                display="inline"
              />
              <Icon
                remixicon="ri-edit-2-line"
                font={{ color: "text-gray-400", size: "text-3xl" }}
              />
            </Container>
          </>
        }
      >
        <ModalCreateFolder />
      </Modal>
    </>
  );
};

export default ClassesPage;
