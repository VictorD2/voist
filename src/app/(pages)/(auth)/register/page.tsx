"use client";

import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { NextPage } from "next";
import Image from "next/image";
import { useGlobalContext } from "@/app/shared/contexts/GlobalProvider";
import { getErrorResponse } from "@/app/shared/utils/helpers";
import AuthRoutes from "@/app/shared/routes/AuthRoutes";
import { RegisterType } from "./types/type";
import Container from "@/app/ui/Container";
import InputText from "@/app/ui/InputText";
import Button from "@/app/ui/Button";
import Text from "@/app/ui/Text";
import person from "@/app/shared/assets/img/person.png";
import laptop from "@/app/shared/assets/img/laptop.png";
import donut from "@/app/shared/assets/img/donut.png";
import logo from "@/app/shared/assets/img/logo.png";
import {
  LoginApiResponse,
  registerService,
} from "@/app/shared/services/auth.services";
import paths from "@/app/shared/routes/paths";

const RegisterPage: NextPage = () => {
  const router = useRouter(); //ROUTER

  // GLOBAL CONTEXT
  const {
    auth: { setIsAuthenticated },
    user: { setUser },
  } = useGlobalContext();

  // FORM CONTROL
  const {
    control,
    formState: { errors },
    handleSubmit,
    setError,
    watch,
  } = useForm<RegisterType>({
    defaultValues: {
      name: "",
      lastname: "",
      email: "",
      password: "",
      repeatPassword: "",
    },
  });

  // GO TO LOGIN
  const handleGoToLogin = () => router.push(paths.login);
  const GoToRoot = () => router.push(paths.root);

  // EVENT FOCUS INPUT
  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const name = e.target.name as keyof RegisterType;
    setError(name, { message: "" });
  };

  // SUBMIT FORM EVENT
  const handleSubmitForm = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (watch("password") !== watch("repeatPassword"))
      return toast.warning("Las contraseñas no coinciden");
    handleSubmit(() => {
      registerMutate();
    })();
  };

  // REGISTER REQUEST
  const { mutate: registerMutate, isLoading: isLoadingRequest } = useMutation<
    LoginApiResponse,
    Error
  >(
    async (): Promise<LoginApiResponse> => {
      const { repeatPassword, ...rest } = watch();
      return await registerService(rest);
    },
    {
      onSuccess: ({ data: { token, user } }) => {
        console.log(token, user);
        setIsAuthenticated(true);
        setUser(user);
        localStorage.setItem("token", token);
        toast.success("Bienvenido!");
      },
      onError: (error: any) => {
        toast.warning(getErrorResponse(error));
      },
    }
  );

  return (
    <AuthRoutes>
      <title>Registro</title>
      <Container
        size={{ width: "w-full", height: "min-h-screen" }}
        justify="justify-center"
        display="flex"
        flexWrap="lg:flex-nowrap flex-wrap"
        flexDirection="flex-row"
      >
        {/* Left Section */}
        <Container
          separator={{ padding: "lg:px-10 px-5 pt-16" }}
          size={{ width: "lg:w-6/12 w-full", minHeight: "min-h-screen" }}
          bgColor="bg-background"
          display="flex"
          flexDirection="flex-col"
        >
          {/* Title */}
          <Container
            as="h3"
            font={{
              color: "text-primary",
              size: "xl:text-6xl lg:text-5xl md:text-6xl text-6xl",
              weight: "font-bold",
              align: "text-center",
            }}
          >
            {"¡Obtén el feedback que necesitabas!"}
          </Container>
          <Container
            position="relative"
            size={{ width: "w-full", height: "h-[35rem]" }}
          >
            <Container
              size={{
                height: `h-[${donut.height}px]`,
                width: `w-[${donut.width}px]`,
              }}
              position="absolute"
              className="2xl:left-[5rem] xl:left-[0rem] left-[0rem] top-[10rem] "
            >
              <Image
                alt="Donut Image"
                src={donut.src}
                width={donut.width}
                height={donut.height}
              />
            </Container>
            <Container
              size={{
                height: `h-[${laptop.height}px]`,
                width: `w-[${laptop.width}px]`,
              }}
              position="absolute"
              className="2xl:left-[10rem] xl:left-[5rem] left-[5rem] top-[13rem]"
            >
              {/* Logo Img */}
              <Image
                alt="Laptop Image"
                src={laptop.src}
                width={laptop.width}
                height={laptop.height}
              />
            </Container>
            <Container
              size={{
                height: `h-[${person.height}px]`,
                width: `w-[${person.width}px]`,
              }}
              position="absolute"
              className="2xl:left-[23rem] xl:left-[10rem] left-[10rem] top-[8rem]"
            >
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
            className="cursor-pointer"
            justify="justify-center"
            onClick={GoToRoot}
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
          separator={{ padding: "xl:p-20 lg:p-20 md:px-40 p-10" }}
          size={{ width: "lg:w-6/12 w-full" }}
          display="flex"
          align="items-center"
          justify="justify-center"
        >
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
                {/* GO TO LOGIN */}
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
                {/* Field name */}
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <InputText
                      placeholder="Escribe tus nombres"
                      onFocus={handleInputFocus}
                      helpText={{ text: errors.name?.message }}
                      onChange={field.onChange}
                      value={field.value}
                      label={{ text: "Nombres" }}
                      name="name"
                      autoComplete="name"
                      required
                    />
                  )}
                />

                {/* Field lastname */}
                <Controller
                  name="lastname"
                  control={control}
                  render={({ field }) => (
                    <InputText
                      placeholder="Escribe tus apellidos"
                      onFocus={handleInputFocus}
                      helpText={{ text: errors.lastname?.message }}
                      onChange={field.onChange}
                      value={field.value}
                      label={{ text: "Apellidos" }}
                      name="lastname"
                      autoComplete="lastname"
                      required
                    />
                  )}
                />

                {/* Field email */}
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <InputText
                      placeholder="Escribe tu correo electrónico"
                      onFocus={handleInputFocus}
                      helpText={{ text: errors.email?.message }}
                      onChange={field.onChange}
                      value={field.value}
                      label={{ text: "Correo" }}
                      name="email"
                      autoComplete="username"
                      required
                    />
                  )}
                />

                {/* Field password */}
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <InputText
                      placeholder="Escribe tu contraseña"
                      onFocus={handleInputFocus}
                      helpText={{ text: errors.password?.message }}
                      onChange={field.onChange}
                      value={field.value}
                      label={{ text: "Contraseña" }}
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                    />
                  )}
                />

                {/* Field Repeat password */}
                <Controller
                  name="repeatPassword"
                  control={control}
                  render={({ field }) => (
                    <InputText
                      placeholder="Repite tu contraseña"
                      onFocus={handleInputFocus}
                      helpText={{ text: errors.repeatPassword?.message }}
                      onChange={field.onChange}
                      value={field.value}
                      label={{ text: "Repite Contraseña" }}
                      name="repeatPassword"
                      type="password"
                      autoComplete="current-password"
                      required
                    />
                  )}
                />

                {/* Button Form */}
                <Button
                  text="Registrarse"
                  font={{ color: "text-white", weight: "font-semibold" }}
                  type="submit"
                  loading={isLoadingRequest}
                  disabled={isLoadingRequest}
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
