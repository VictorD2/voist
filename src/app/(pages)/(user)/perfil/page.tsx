"use client";

import Container from "@/app/ui/Container";
import contact from "@/app/shared/assets/img/contact.png";
import Text from "@/app/ui/Text";
import { NextPage } from "next";
import Image from "next/image";
import Button from "@/app/ui/Button";
import InputText from "@/app/ui/InputText";
import Breadcrumbs from "@/app/ui/Breadcrumbs";
import paths from "@/app/shared/routes/paths";
import { useRouter } from "next/navigation";

const PerfilPage: NextPage = () => {
  const router = useRouter();

  const handleChangePassword = () => router.push(paths.changePassword);

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
          routes={[{ link: paths.perfil, name: "Gestionar cuenta" }]}
        />
      </Container>
      <Container
        display="flex"
        flexWrap="flex-wrap"
        flexDirection="flex-row"
        separator={{ padding: "lg:pl-10 pl-0" }}
      >
        <Container
          size={{
            width: "lg:w-1/2 w-full",
            minHeight: "lg:min-h-[20rem] min-h-[15rem]",
          }}
        >
          <Text text="Imagen de Perfil" font={{ size: "text-xl" }} />
          <Container
            separator={{ margin: "mt-5" }}
            display="flex"
            flexDirection="flex-row"
            flexWrap="flex-nowrap"
            gap="gap-5"
            align="items-center"
          >
            <Image
              height={contact.height * 2}
              width={contact.width * 2}
              className="rounded-full"
              alt="Contact's photo"
              src={contact.src}
            />
            <Button
              remixicon="ri-image-edit-line"
              text="Cambiar Imagen"
              size={{ width: "" }}
              bgColor="bg-white"
              border={{ size: "border", color: "border-gray-200" }}
            />
          </Container>
        </Container>
        <Container
          size={{
            width: "lg:w-1/2 w-full",
            minHeight: "lg:min-h-[20rem] min-h-[15rem]",
          }}
        >
          <Text text="Cuenta" font={{ size: "text-xl" }} />
          <Container
            separator={{ margin: "mt-5" }}
            display="flex"
            flexDirection="flex-col"
            gap="gap-5"
          >
            <InputText
              name="email"
              size={{ width: "w-96" }}
              value="fjara@upao.edu.pe"
              label={{ text: "Correo" }}
            />
            <InputText
              name="current-password"
              size={{ width: "w-96" }}
              value="*********"
              type="password"
              label={{ text: "Contraseña" }}
            />
          </Container>
        </Container>
        <Container
          size={{
            width: "lg:w-1/2 w-full",
            minHeight: "lg:min-h-[20rem] min-h-[15rem]",
          }}
        >
          <Text text="Información Personal" font={{ size: "text-xl" }} />
          <Container
            separator={{ margin: "mt-5" }}
            display="flex"
            flexDirection="flex-col"
            gap="gap-5"
          >
            <InputText
              name="name"
              size={{ width: "w-96" }}
              value="Francisco"
              label={{ text: "Nombres" }}
            />
            <InputText
              name="apellido"
              size={{ width: "w-96" }}
              value="Jara"
              label={{ text: "Apellidos" }}
            />
          </Container>
        </Container>
        <Container
          size={{
            width: "lg:w-1/2 w-full",
            minHeight: "lg:min-h-[20rem] min-h-[15rem]",
          }}
        >
          <Button
            onClick={handleChangePassword}
            text="Modificar Contraseña"
            size={{ width: "" }}
            bgColor="bg-white"
            remixicon="ri-key-2-line"
            border={{ size: "border", color: "border-gray-200" }}
          />
        </Container>
      </Container>

      <Container display="flex" justify="justify-center">
        <Button
          size={{ width: "" }}
          text="Guardar Cambios"
          font={{ color: "text-white" }}
        />
      </Container>
    </Container>
  );
};

export default PerfilPage;
