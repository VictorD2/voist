"use client";

import { useState } from "react";
import { NextPage } from "next";
import folderFileList from "./fileFolderList.json";
import Breadcrumbs from "@/app/ui/Breadcrumbs";
import paths from "@/app/shared/routes/paths";
import Container from "@/app/ui/Container";
import InputText from "@/app/ui/InputText";
import FileFolder from "./FileFolder";
import Button from "@/app/ui/Button";
import ProtectedRoutes from "@/app/shared/routes/ProtectedRoutes";

const MySpacePage: NextPage = () => {
  const [isActived, setIsActived] = useState<boolean>(false);

  return (
    <ProtectedRoutes code="P01">
      <Container
        size={{ width: "w-full" }}
        display="flex"
        flexDirection="flex-col"
        gap="gap-5"
      >
        {/* Title */}
        <Breadcrumbs routes={[{ link: paths.mySpace, name: "Mi unidad" }]} />
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
        <InputText
          placeholder="Buscar..."
          size={{ width: "lg:w-5/12 md:w-7/12 w-full" }}
          responsiveIcon="ri-search-line"
        />
      </Container>

      {/* List */}
      <Container
        separator={{ margin: "mt-10" }}
        display="flex"
        flexDirection="flex-row"
        flexWrap="flex-wrap"
        justify="justify-between"
        gap="gap-10"
      >
        {folderFileList.map((item) => {
          return <FileFolder {...item} key={item.id + item.title} />;
        })}
      </Container>
    </ProtectedRoutes>
  );
};

export default MySpacePage;
