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
import logo from "@/app/shared/assets/img/logo.png";
import { LoginResolver } from "./Login.yup";
import InputText from "@/app/ui/InputText";
import Container from "@/app/ui/Container";
import { LoginType } from "./types/type";
import Button from "@/app/ui/Button";
import Text from "@/app/ui/Text";
import {
  LoginApiResponse,
  loginService,
} from "@/app/shared/services/auth.services";
import paths from "@/app/shared/routes/paths";

const LoginPage: NextPage = () => {
  // ROUTER
  const router = useRouter();

  // CONTEXT
  const {
    auth: { setIsAuthenticated },
    user: { setUser },
  } = useGlobalContext();

  // GO TO REGISTER
  const handleGoToRegister = () => router.push(paths.register);
  const GoToRoot = () => router.push(paths.root);

  // FORM CONTROLLER
  const {
    control,
    formState: { errors },
    handleSubmit,
    setError,
    watch,
  } = useForm<LoginType>({
    resolver: LoginResolver,
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // FOCUS INPUT EVENT
  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const name = e.target.name as keyof LoginType;
    setError(name, { message: "" });
  };

  // FORM SUBMIT EVENT
  const handleSubmitForm = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    handleSubmit(() => {
      loginMutate();
    })();
  };

  // LOGIN REQUEST
  const { mutate: loginMutate, isLoading: isLoadingRequest } = useMutation<
    LoginApiResponse,
    Error
  >(
    async (): Promise<LoginApiResponse> => {
      return await loginService({ ...watch() });
    },
    {
      onSuccess: ({ data: { token, user } }) => {
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
      <title>Iniciar Sesión</title>
      <Container
        bgColor="bg-white"
        size={{ width: "w-full", minHeight: "min-h-screen" }}
        justify="justify-center"
        align="items-center"
        display="flex"
        flexDirection="flex-col"
      >
        {/* Img Logo */}
        <Container className="cursor-pointer" onClick={GoToRoot}>
          <Image
            alt="Voist Logo"
            src={logo.src}
            width={logo.width}
            height={logo.height}
          />
        </Container>

        {/* Main Container */}
        <Container
          separator={{ padding: "py-10 px-5" }}
          justify="justify-center"
          flexDirection="flex-col"
          bgColor="bg-white"
          align="items-center"
          display="flex"
          gap="gap-8"
          size={{
            width: "2xl:w-3/12 lg:w-4/12 md:w-6/12 w-11/12",
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

            {/* Switch to Register */}
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
              {/* Email Field */}
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

              {/* Password Field */}
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
              <Button
                loading={isLoadingRequest}
                disabled={isLoadingRequest}
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
