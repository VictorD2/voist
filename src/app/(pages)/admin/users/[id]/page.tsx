/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";
import paths from "@/app/shared/routes/paths";
import {
  UserLoggedTimeApiResponse,
  getUserByIdService,
  getUserLoggedTimeByIdService,
} from "@/app/shared/services/user.services";
import { UserType } from "@/app/shared/types/user.type";
import Breadcrumbs from "@/app/ui/Breadcrumbs";
import Container from "@/app/ui/Container";
import Text from "@/app/ui/Text";
import moment from "moment";
import { NextPage } from "next";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import BarChart from "./components/BarChart";
import ProtectedRoutes from "@/app/shared/routes/ProtectedRoutes";

const AdminUserPage: NextPage = () => {
  const params = useParams();
  const [loggedTime, setLoggedTime] = useState<
    Array<{ day: string; minutes: number }>
  >([]);
  const [user, setUser] = useState<UserType>({
    id: 0,
    email: "",
    lastname: "",
    name: "",
    roleId: 0,
    state: false,
  });
  const { refetch } = useQuery<any>(
    "GET-CONTACT-BY-ID",
    async () => {
      return await getUserByIdService(+params.id);
    },
    {
      onSuccess: ({ data }) => {
        setUser(data);
      },
      onError: () => {},
    }
  );

  const { refetch: refetchLoggedTime } = useQuery<UserLoggedTimeApiResponse>(
    "GET-LOGGED-TIME-BY-USER-ID",
    async () => {
      return await getUserLoggedTimeByIdService(+params.id);
    },
    {
      onSuccess: ({ data }) => {
        setLoggedTime(data);
      },
      onError: () => {},
    }
  );

  useEffect(() => {
    refetch();
    refetchLoggedTime();
    return () => {};
  }, []);

  return (
    <ProtectedRoutes code="P06">
      <Container
        size={{ width: "w-full" }}
        display="flex"
        flexDirection="flex-col"
        gap="gap-5"
      >
        {/* Breadcrumbs */}
        <Breadcrumbs
          routes={[
            { link: paths.panelUsers, name: "Gestión de Usuarios" },
            {
              link: paths.panelUsersId(user.id + ""),
              name: user.name + " " + user.lastname,
            },
          ]}
        />
      </Container>
      <Container
        separator={{ padding: "p-5" }}
        display="flex"
        align="items-center"
        flexWrap="flex-nowrap"
        gap="gap-x-5"
      >
        <Container rounded="rounded-full">
          <img
            className="rounded-full"
            src={user.photo + ""}
            alt="Photo Profile"
          />
        </Container>
        <Container
          bgColor="bg-gray-100"
          size={{ width: "w-full" }}
          separator={{ padding: "p-10" }}
        >
          <Text
            separator={{ margin: "mb-2" }}
            text="Datos personales"
            font={{ weight: "font-bold", color: "text-primary" }}
            size={{ width: "w-full" }}
          />
          <Container
            separator={{ margin: "mb-2" }}
            size={{ width: "w-full" }}
            display="flex"
            flexWrap="lg:flex-nowrap md:flex-nowrap flex-wrap"
          >
            <Text
              text="Nombres:"
              size={{ width: "" }}
              font={{ whiteSpace: "whitespace-nowrap" }}
            />
            <Text
              font={{
                color: "text-gray-500",
                whiteSpace: "whitespace-nowrap",
                indentText: "indent-2",
              }}
              text={user.name}
              size={{ width: "lg:w-44 md:w-full w-full" }}
            />
            <Text
              text="Fecha de Creación:"
              size={{ width: "" }}
              font={{ whiteSpace: "whitespace-nowrap" }}
            />
            <Text
              font={{
                color: "text-gray-500",
                whiteSpace: "whitespace-nowrap",
                indentText: "indent-2",
              }}
              text={moment(user.createdAt).format("DD/MM/YYYY")}
              size={{ width: "lg:w-44 md:w-full w-full" }}
            />
          </Container>
          <Container
            size={{ width: "w-full" }}
            display="flex"
            flexWrap="lg:flex-nowrap md:flex-nowrap flex-wrap"
          >
            <Text
              text="Apellidos:"
              size={{ width: "" }}
              font={{ whiteSpace: "whitespace-nowrap" }}
            />
            <Text
              font={{
                color: "text-gray-500",
                whiteSpace: "whitespace-nowrap",
                indentText: "indent-2",
              }}
              text={user.lastname}
              size={{ width: "lg:w-44 md:w-full w-full" }}
            />
            <Text
              text="Correo:"
              size={{ width: "" }}
              font={{ whiteSpace: "whitespace-nowrap" }}
            />
            <Text
              font={{
                color: "text-gray-500",
                whiteSpace: "whitespace-nowrap",
                indentText: "indent-2",
              }}
              text={user.email}
              size={{ width: "lg:w-44 md:w-full w-full" }}
            />
          </Container>
        </Container>
      </Container>
      <Container
        bgColor="bg-white"
        separator={{ margin: "mt-10", padding: "p-10" }}
        shadow={{
          color: "shadow-gray-300",
          size: "shadow-lg",
        }}
      >
        <BarChart
          yLabel="Minutos"
          xLabel="Dias"
          data={loggedTime.map((item) => item.minutes)}
          labels={loggedTime.map((item) =>
            moment(item.day.replace("T00:00:00.000Z", "")).format("MMM DD")
          )}
          title="Tiempo de uso de la aplicación"
          subtitle="Últimos 7 días"
        />
      </Container>
    </ProtectedRoutes>
  );
};

export default AdminUserPage;
