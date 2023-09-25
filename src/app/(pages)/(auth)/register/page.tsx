"use client";

import AuthRoutes from "@/app/shared/routes/AuthRoutes";
import Container from "@/app/ui/Container";
import { NextPage } from "next";
import logo from "@/app/shared/assets/img/logo.png";
import person from "@/app/shared/assets/img/person.png";
import laptop from "@/app/shared/assets/img/laptop.png";
import donut from "@/app/shared/assets/img/donut.png";
import Image from "next/image";
import Text from "@/app/ui/Text";
import InputText from "@/app/ui/InputText";
import Button from "@/app/ui/Button";
import { useGlobalContext } from "@/app/shared/contexts/GlobalProvider";
import { useRouter } from "next/navigation";

const RegisterPage: NextPage = () => {
  const {
    auth: { setIsAuthenticated },
  } = useGlobalContext();

  const router = useRouter();

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsAuthenticated(true);
  };

  const handleGoToLogin = () => router.push("/login");

  return (
    <AuthRoutes>
      <title>Registro</title>
      <Container
        bgColor="bg-white"
        size={{ width: "w-full", minHeight: "min-h-screen" }}
        justify="justify-center"
        align="items-center"
        display="flex"
        flexWrap="lg:flex-nowrap flex-wrap"
        flexDirection="flex-row"
      >
        {/* Left Section */}
        <Container
          separator={{ padding: "lg:px-10 px-5 pt-24" }}
          size={{ width: "lg:w-6/12 w-full", minHeight: "min-h-screen" }}
          bgColor="bg-background"
          display="flex"
          flexDirection="flex-col"
        >
          <Text
            text="¡Obtén el feedback que necesitabas!"
            font={{
              color: "text-primary",
              size: "text-6xl",
              weight: "font-bold",
              align: "text-center",
            }}
          />
          <Container
            position="relative"
            size={{ width: "w-full", height: "h-[35rem]" }}
            separator={{ padding: "lg:p-20 px-4 py-10" }}
          >
            <Container
              position="absolute"
              className="lg:left-16 left-10 top-[10rem]"
            >
              <Image
                alt="Donut Image"
                src={donut.src}
                width={donut.width}
                height={donut.height}
              />
            </Container>
            <Container
              position="absolute"
              className="lg:left-[10rem] left-10 top-[10rem]"
            >
              <Image
                alt="Laptop Image"
                src={laptop.src}
                width={laptop.width}
                height={logo.height}
              />
            </Container>
            <Container position="absolute" className="lg:right-5 -right-10">
              <Image
                alt="Person Image"
                src={person.src}
                width={person.width}
                height={person.height}
              />
            </Container>
          </Container>
          <Container
            size={{ width: "w-full" }}
            display="flex"
            justify="justify-center"
          >
            <Image
              alt="Voist Logo"
              src={logo.src}
              width={logo.width}
              height={logo.height}
            />
          </Container>
        </Container>
        {/* Right Section */}
        <Container
          separator={{ padding: "lg:p-44 md:p-20 p-10" }}
          size={{ width: "lg:w-6/12 w-full" }}
        >
          {/* Img */}
          <Container
            separator={{ padding: "py-10" }}
            justify="justify-center"
            flexDirection="flex-col"
            bgColor="bg-white"
            align="items-center"
            display="flex"
            gap="gap-8"
            size={{
              width: "w-full",
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
              {/* Head Registro */}
              <Text
                text="Registro"
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
                  <Text display="inline" text="¿Ya tiene una cuenta?" />
                  <Text
                    onClick={handleGoToLogin}
                    separator={{ margin: "ml-2" }}
                    className="cursor-pointer"
                    display="inline"
                    text="Inicio de sesión"
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
                <InputText label={{ text: "Nombres" }} />
                <InputText label={{ text: "Apellidos" }} />
                <InputText label={{ text: "Correo" }} />
                <InputText type="password" label={{ text: "Contraseña" }} />
                <InputText
                  type="password"
                  label={{ text: "Repetir Contraseña" }}
                />
                <Button
                  text="Registrarse"
                  font={{ color: "text-white", weight: "font-semibold" }}
                  type="submit"
                />
              </Container>
            </Container>
          </Container>
        </Container>
      </Container>
    </AuthRoutes>
  );
};

export default RegisterPage;
