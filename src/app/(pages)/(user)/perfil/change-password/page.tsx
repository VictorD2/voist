"use client";
import { NextPage } from "next";
import Container from "@/app/ui/Container";
import Breadcrumbs from "@/app/ui/Breadcrumbs";
import Button from "@/app/ui/Button";
import paths from "@/app/shared/routes/paths";
import InputText from "@/app/ui/InputText";

const ChangePasswordPage: NextPage = () => {
  return (
    <Container>
      <Container
        size={{ width: "w-full" }}
        display="flex"
        flexDirection="flex-col"
        gap="gap-5"
        separator={{ margin: "mb-10" }}
      >
        {/* Title */}
        <Breadcrumbs
          routes={[
            { link: paths.perfil, name: "Gestionar cuenta" },
            { link: paths.changePassword, name: "Modificar Contraseña" },
          ]}
        />
      </Container>
      <Container
        display="flex"
        flexWrap="flex-wrap"
        flexDirection="flex-row"
        separator={{ padding: "lg:pl-10 pl-0" }}
      >
        <Container
          display="flex"
          flexDirection="flex-col"
          gap="gap-5"
          size={{
            width: "lg:w-1/2 w-full",
            minHeight: "lg:min-h-[20rem] min-h-[15rem]",
          }}
        >
          <InputText
            size={{ width: "w-96" }}
            label={{ text: "Ingresar contraseña actual" }}
          />
          <InputText
            size={{ width: "w-96" }}
            label={{ text: "Ingresar nueva contraseña" }}
          />
        </Container>
      </Container>

      <Container display="flex" justify="justify-center" gap="gap-10">
        <Button
          bgColor="bg-gray-500"
          size={{ width: "w-96" }}
          text="Cancelar"
          font={{ color: "text-white" }}
        />
        <Button
          size={{ width: "w-96" }}
          text="Guardar Cambios"
          font={{ color: "text-white" }}
        />
      </Container>
    </Container>
  );
};

export default ChangePasswordPage;
