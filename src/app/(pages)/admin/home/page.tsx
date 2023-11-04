/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import paths from "@/app/shared/routes/paths";
import Breadcrumbs from "@/app/ui/Breadcrumbs";
import Container from "@/app/ui/Container";
import Text from "@/app/ui/Text";
import { NextPage } from "next";
import LineChart from "./components/LineChart";
import { useQuery } from "react-query";
import {
  ClassesCountApiResponse,
  ClassesCountMonthApiResponse,
  getClassCountPerMonthService,
  getClassCountService,
} from "@/app/shared/services/class.services";
import { useEffect, useState } from "react";
import moment from "moment";
import {
  UserCountApiResponse,
  getCountNewUsersService,
  getCountUsersService,
} from "@/app/shared/services/user.services";
import ProtectedRoutes from "@/app/shared/routes/ProtectedRoutes";

const AdminHomePage: NextPage = () => {
  const [countUsers, setCountUsers] = useState(0);
  const [countNewUsers, setCountNewUsers] = useState(0);
  const [countClass, setCountClass] = useState(0);
  const [classesCountMonth, setClassesCountMonth] = useState<Array<number>>([]);
  const [months, setMonths] = useState<Array<string>>([]);

  const { refetch } = useQuery<ClassesCountMonthApiResponse>(
    "GET-COUNT-CLASS-PER-MONTH",
    async () => {
      return await getClassCountPerMonthService();
    },
    {
      onSuccess: ({ data }) => {
        setClassesCountMonth(data.map((item) => item.count));
        setMonths(data.map((item) => item.month.replace("T00:00:00.000Z", "")));
      },
      onError: () => {},
    }
  );
  const { refetch: refetchCount } = useQuery<ClassesCountApiResponse>(
    "GET-COUNT-CLASS",
    async () => {
      return await getClassCountService();
    },
    {
      onSuccess: ({ data }) => {
        setCountClass(data);
      },
      onError: () => {},
    }
  );

  const { refetch: refetchCountUsers } = useQuery<UserCountApiResponse>(
    "GET-COUNT-USERS",
    async () => {
      return await getCountUsersService();
    },
    {
      onSuccess: ({ data }) => {
        setCountUsers(data);
      },
      onError: () => {},
    }
  );
  const { refetch: refetchCountNewUsers } = useQuery<UserCountApiResponse>(
    "GET-COUNT-NEW-USERS",
    async () => {
      return await getCountNewUsersService();
    },
    {
      onSuccess: ({ data }) => {
        setCountNewUsers(data);
      },
      onError: () => {},
    }
  );

  useEffect(() => {
    refetch();
    refetchCount();
    refetchCountUsers();
    refetchCountNewUsers();
    return () => {};
  }, []);

  return (
    <ProtectedRoutes code="P05">
      <Container
        size={{ width: "w-full" }}
        display="flex"
        flexDirection="flex-col"
        gap="gap-5"
      >
        {/* Search */}

        {/* Breadcrumbs */}
        <Breadcrumbs routes={[{ link: paths.adminHome, name: "Inicio" }]} />
      </Container>

      {/* Actions */}
      <Container
        separator={{ margin: "mt-10" }}
        size={{ width: "w-full" }}
        display="flex"
        flexDirection="flex-row"
        justify="justify-evenly"
        flexWrap="flex-wrap"
        gap="gap-4"
      >
        <Container
          rounded="rounded-md"
          display="flex"
          flexDirection="flex-col"
          align="items-center"
          justify="justify-center"
          separator={{ padding: "py-5 px-10" }}
          bgColor="bg-amber-100"
        >
          <Text
            text={countUsers + ""}
            font={{ align: "text-center", weight: "font-bold" }}
          />
          <Text text="Usuarios Registrados" font={{ align: "text-center" }} />
        </Container>
        <Container
          rounded="rounded-md"
          display="flex"
          flexDirection="flex-col"
          align="items-center"
          justify="justify-center"
          separator={{ padding: "py-5 px-10" }}
          bgColor="bg-blue-100"
        >
          <Text
            text={countClass + ""}
            font={{ align: "text-center", weight: "font-bold" }}
          />
          <Text
            text="Grabaciones Registradas"
            font={{ align: "text-center" }}
          />
        </Container>
        <Container
          rounded="rounded-md"
          display="flex"
          flexDirection="flex-col"
          align="items-center"
          justify="justify-center"
          separator={{ padding: "py-5 px-10" }}
          bgColor="bg-green-100"
        >
          <Text
            text={countNewUsers + ""}
            font={{ align: "text-center", weight: "font-bold" }}
          />
          <Text text="Usuarios Nuevos" font={{ align: "text-center" }} />
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
        <LineChart
          data={classesCountMonth}
          labels={months.map((item) => moment(item).format("MMM YYYY"))}
          title="Historial de Grabaciones"
        />
      </Container>
    </ProtectedRoutes>
  );
};

export default AdminHomePage;
