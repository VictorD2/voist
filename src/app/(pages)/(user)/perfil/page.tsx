"use client";

import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { NextPage } from "next";
import Image from "next/image";
import { useGlobalContext } from "@/app/shared/contexts/GlobalProvider";
import contact from "@/app/shared/assets/img/contact.png";
import { UserType } from "@/app/shared/types/user.type";
import Breadcrumbs from "@/app/ui/Breadcrumbs";
import paths from "@/app/shared/routes/paths";
import Container from "@/app/ui/Container";
import InputText from "@/app/ui/InputText";
import Button from "@/app/ui/Button";
import Text from "@/app/ui/Text";
import ProtectedRoutes from "@/app/shared/routes/ProtectedRoutes";

const PerfilPage: NextPage = () => {
  const router = useRouter();

  const {
    user: { user },
  } = useGlobalContext();
  const handleChangePassword = () => router.push(paths.changePassword);

  const {
    control,
    formState: { errors },
    setError,
  } = useForm<UserType>({
    defaultValues: {
      email: user.email,
      lastname: user.lastname,
      name: user.name,
      password: "",
    },
  });

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const name = e.target.name as keyof Omit<UserType, "id" | "password">;
    setError(name, { message: "" });
  };

  return (
    <ProtectedRoutes code="P07">
      <Container as="form">
        <Container
          separator={{ margin: "mb-10" }}
          size={{ width: "w-full" }}
          flexDirection="flex-col"
          display="flex"
          gap="gap-5"
        >
          {/* Title */}
          <Breadcrumbs
            routes={[{ link: paths.perfil, name: "Gestionar cuenta" }]}
          />
        </Container>
        <Container
          separator={{ padding: "lg:pl-10 pl-0" }}
          flexDirection="flex-row"
          flexWrap="flex-wrap"
          display="flex"
        >
          <Container
            size={{
              minHeight: "lg:min-h-[20rem] min-h-[15rem]",
              width: "lg:w-1/2 w-full",
            }}
          >
            <Text text="Imagen de Perfil" font={{ size: "text-xl" }} />
            <Container
              separator={{ margin: "mt-5" }}
              flexDirection="flex-row"
              flexWrap="flex-nowrap"
              align="items-center"
              display="flex"
              gap="gap-5"
            >
              <Image
                height={contact.height * 2}
                width={contact.width * 2}
                className="rounded-full"
                alt="Contact's photo"
                src={contact.src}
              />
              <Button
                border={{ size: "border", color: "border-gray-200" }}
                remixicon="ri-image-edit-line"
                text="Cambiar Imagen"
                size={{ width: "" }}
                bgColor="bg-white"
              />
            </Container>
          </Container>
          <Container
            size={{
              minHeight: "lg:min-h-[20rem] min-h-[15rem]",
              width: "lg:w-1/2 w-full",
            }}
          >
            <Text text="Cuenta" font={{ size: "text-xl" }} />
            <Container
              separator={{ margin: "mt-5" }}
              flexDirection="flex-col"
              display="flex"
              gap="gap-5"
            >
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <InputText
                    helpText={{ text: errors.email?.message }}
                    placeholder="Escribe tu correo"
                    onFocus={handleInputFocus}
                    label={{ text: "Correo" }}
                    onChange={field.onChange}
                    size={{ width: "w-96" }}
                    autoComplete="username"
                    value={field.value}
                    name="email"
                    required
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <InputText
                    helpText={{ text: errors.password?.message }}
                    placeholder="Escribe tu contraseña"
                    autoComplete="current-password"
                    label={{ text: "Contraseña" }}
                    onFocus={handleInputFocus}
                    onChange={field.onChange}
                    size={{ width: "w-96" }}
                    value={field.value}
                    name="password"
                    type="password"
                    required
                  />
                )}
              />
            </Container>
          </Container>
          <Container
            size={{
              minHeight: "lg:min-h-[20rem] min-h-[15rem]",
              width: "lg:w-1/2 w-full",
            }}
          >
            <Text text="Información Personal" font={{ size: "text-xl" }} />
            <Container
              separator={{ margin: "mt-5" }}
              flexDirection="flex-col"
              display="flex"
              gap="gap-5"
            >
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <InputText
                    helpText={{ text: errors.name?.message }}
                    placeholder="Escribe tus nombres"
                    label={{ text: "Nombres" }}
                    onFocus={handleInputFocus}
                    onChange={field.onChange}
                    size={{ width: "w-96" }}
                    value={field.value}
                    name="name"
                    required
                  />
                )}
              />

              <Controller
                name="lastname"
                control={control}
                render={({ field }) => (
                  <InputText
                    helpText={{ text: errors.lastname?.message }}
                    placeholder="Escribe tus apellidos"
                    label={{ text: "Apellidos" }}
                    onFocus={handleInputFocus}
                    onChange={field.onChange}
                    size={{ width: "w-96" }}
                    value={field.value}
                    name="lastname"
                    required
                  />
                )}
              />
            </Container>
          </Container>
          <Container
            size={{
              minHeight: "lg:min-h-[20rem] min-h-[15rem]",
              width: "lg:w-1/2 w-full",
            }}
          >
            <Button
              border={{ size: "border", color: "border-gray-200" }}
              onClick={handleChangePassword}
              text="Modificar Contraseña"
              remixicon="ri-key-2-line"
              size={{ width: "" }}
              bgColor="bg-white"
            />
          </Container>
        </Container>

        <Container display="flex" justify="justify-center">
          <Button
            font={{ color: "text-white" }}
            text="Guardar Cambios"
            size={{ width: "" }}
          />
        </Container>
      </Container>
    </ProtectedRoutes>
  );
};

export default PerfilPage;
