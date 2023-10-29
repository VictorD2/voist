"use client";
import { useState } from "react";
import { NextPage } from "next";
import folderFileList from "./fileFolderList.json";
import FileFolder from "../my-space/FileFolder";
import paths from "@/app/shared/routes/paths";
import Breadcrumbs from "@/app/ui/Breadcrumbs";
import Container from "@/app/ui/Container";
import InputText from "@/app/ui/InputText";
import Button from "@/app/ui/Button";

const SharedPage: NextPage = () => {
  const [isActived, setIsActived] = useState<boolean>(false);

  return (
    <>
      <Container
        size={{ width: "w-full" }}
        flexDirection="flex-col"
        display="flex"
        gap="gap-5"
      >
        {/* Title */}
        <Breadcrumbs
          routes={[{ link: paths.shared, name: "Compartidos conmigo" }]}
        />
      </Container>

      {/* Actions */}
      <Container
        separator={{ margin: "mt-10", padding: "" }}
        size={{ width: "w-full" }}
        flexDirection="flex-row"
        flexWrap="flex-nowrap"
        display="flex"
        gap="gap-4"
      >
        <Button
          border={{ size: "border", color: "border-gray-200" }}
          text="Ordenar por más recientes"
          remixicon="ri-sort-desc"
          size={{ width: "" }}
          bgColor="bg-white"
          toggle={isActived}
          ripples={false}
          onClick={() => {
            setIsActived((state) => !state);
          }}
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
        flexDirection="flex-row"
        justify="justify-between"
        flexWrap="flex-wrap"
        display="flex"
        gap="gap-10"
      >
        {folderFileList.map((item) => {
          return <FileFolder {...item} key={item.id + item.title} />;
        })}
      </Container>
    </>
  );
};

export default SharedPage;
