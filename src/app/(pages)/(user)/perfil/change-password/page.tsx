"use client";
import { NextPage } from "next";
import Breadcrumbs from "@/app/ui/Breadcrumbs";
import paths from "@/app/shared/routes/paths";
import InputText from "@/app/ui/InputText";
import Container from "@/app/ui/Container";
import Button from "@/app/ui/Button";
import ProtectedRoutes from "@/app/shared/routes/ProtectedRoutes";

const ChangePasswordPage: NextPage = () => {
  return (
    <ProtectedRoutes code="P08">
      <Container>
        <Container
          separator={{ margin: "mb-10" }}
          size={{ width: "w-full" }}
          flexDirection="flex-col"
          display="flex"
          gap="gap-5"
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
          separator={{ padding: "lg:pl-10 pl-0" }}
          flexDirection="flex-row"
          flexWrap="flex-wrap"
          display="flex"
        >
          <Container
            flexDirection="flex-col"
            display="flex"
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
            font={{ color: "text-white" }}
            size={{ width: "w-96" }}
            bgColor="bg-gray-500"
            text="Cancelar"
          />
          <Button
            font={{ color: "text-white" }}
            size={{ width: "w-96" }}
            text="Guardar Cambios"
          />
        </Container>
      </Container>
    </ProtectedRoutes>
  );
};

export default ChangePasswordPage;
