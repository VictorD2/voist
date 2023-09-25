"use client";

import AuthRoutes from "@/app/shared/routes/AuthRoutes";
import Container from "@/app/ui/Container";
import { NextPage } from "next";
import Image from "next/image";
import logo from "@/app/shared/assets/img/logo.png";
import Text from "@/app/ui/Text";
import InputText from "@/app/ui/InputText";
import Button from "@/app/ui/Button";
import { useGlobalContext } from "@/app/shared/contexts/GlobalProvider";
import { useRouter } from "next/navigation";

const LoginPage: NextPage = () => {
  const {
    auth: { setIsAuthenticated },
  } = useGlobalContext();

  const router = useRouter();

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsAuthenticated(true);
  };

  const handleGoToRegister = () => router.push("/register");

  return (
    <AuthRoutes>
      <title>Iniciar Sesión</title>
      <Container
        bgColor="bg-white"
        size={{ width: "w-full", minHeight: "min-h-screen" }}
        justify="justify-center"
        align="items-center"
        display="flex"
        flexDirection="flex-col"
      >
        {/* Img */}
        <Container>
          <Image
            alt="Voist Logo"
            src={logo.src}
            width={logo.width}
            height={logo.height}
          />
        </Container>
        <Container
          separator={{ padding: "py-10 px-5" }}
          justify="justify-center"
          flexDirection="flex-col"
          bgColor="bg-white"
          align="items-center"
          display="flex"
          gap="gap-8"
          size={{
            width: "lg:w-3/12 md:w-6/12 w-11/12",
          }}
          shadow={{
            color: "shadow-gray-400",
            size: "shadow",
          }}
        >
          <Container
            size={{
              width: "w-full",
            }}
          >
            {/* Head Login */}
            <Text
              text="Inicio de Sesión"
              font={{
                align: "text-center",
                weight: "font-semibold",
                size: "text-xl",
              }}
            />
            <Container
              size={{ width: "w-full" }}
              display="flex"
              justify="justify-center"
            >
              <Container>
                <Text display="inline" text="¿Aún no tiene una cuenta?" />
                <Text
                  onClick={handleGoToRegister}
                  separator={{ margin: "ml-2" }}
                  className="cursor-pointer"
                  display="inline"
                  text="Cree una cuenta"
                  font={{ color: "text-primary", weight: "font-bold" }}
                />
              </Container>
            </Container>
            {/* Form */}

            <Container
              as="form"
              onSubmit={handleSubmitForm}
              separator={{ padding: "px-4", margin: "mt-6" }}
              gap="gap-5"
              display="flex"
              flexDirection="flex-col"
            >
              <InputText label={{ text: "Correo" }} />
              <InputText type="password" label={{ text: "Contraseña" }} />
              <Button
                text="Inicio de sesión"
                font={{ color: "text-white", weight: "font-semibold" }}
                type="submit"
              />
            </Container>
          </Container>
        </Container>
      </Container>
    </AuthRoutes>
  );
};

export default LoginPage;
