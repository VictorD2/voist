"use client";
import { NextPage } from "next";
import ProtectedRoutes from "@/app/shared/routes/ProtectedRoutes";
import FileFolder from "../my-space/FileFolder";
import folderFileList from "./fileFolderList.json";
import paths from "@/app/shared/routes/paths";
import Breadcrumbs from "@/app/ui/Breadcrumbs";
import InputText from "@/app/ui/InputText";
import Container from "@/app/ui/Container";
import Button from "@/app/ui/Button";

const ClassesPage: NextPage = () => {
  return (
    <ProtectedRoutes>
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
        <Button
          ripples={false}
          text="Nuevo"
          remixicon="ri-add-line"
          size={{ width: "" }}
          bgColor="bg-white"
          border={{ size: "border", color: "border-gray-200" }}
        />
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
    </ProtectedRoutes>
  );
};

export default ClassesPage;
