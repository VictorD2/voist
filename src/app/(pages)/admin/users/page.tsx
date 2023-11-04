/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";
import paths from "@/app/shared/routes/paths";
import {
  UsersApiResponse,
  getUsersService,
} from "@/app/shared/services/user.services";
import { UserType } from "@/app/shared/types/user.type";
import Breadcrumbs from "@/app/ui/Breadcrumbs";
import Container from "@/app/ui/Container";
import InputText from "@/app/ui/InputText";
import Paginate from "@/app/ui/Paginate";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Text from "@/app/ui/Text";
import Button from "@/app/ui/Button";
import { useRouter } from "next/navigation";
import ProtectedRoutes from "@/app/shared/routes/ProtectedRoutes";

type OptsType = {
  filter: string;
  page: number;
  limit: number;
};
const AdminUsersPage: NextPage = () => {
  const router = useRouter();
  const [users, setUsers] = useState<Array<UserType>>([]);
  const [count, setCount] = useState<number>(0);
  const [opts, setOpts] = useState<OptsType>({
    filter: "",
    limit: 25,
    page: 1,
  });

  const { refetch } = useQuery<UsersApiResponse>(
    ["GET-USERS"],
    async () => {
      return await getUsersService(opts.filter, opts.page, opts.limit);
    },
    {
      onSuccess: ({ data }) => {
        setUsers(data.users);
        setCount(data.quantity);
      },
      onError: () => {},
    }
  );

  const GoToPanelUser = (id: number) => {
    return () => {
      router.push(paths.panelUsersId(id + ""));
    };
  };

  useEffect(() => {
    refetch();
    return () => {};
  }, [opts]);

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
          routes={[{ link: paths.panelUsers, name: "Gestión de Usuarios" }]}
        />
      </Container>

      {/* Actions */}
      <Container
        separator={{ margin: "mt-10" }}
        size={{ width: "w-full" }}
        display="flex"
        flexDirection="flex-col"
        justify="justify-start"
        flexWrap="flex-wrap"
        gap="gap-4"
      >
        <InputText
          onChange={(e) => {
            setOpts({ ...opts, filter: e.target.value });
          }}
          value={opts.filter}
          placeholder="Buscar..."
          size={{ width: "lg:w-5/12 md:w-7/12 w-full" }}
          responsiveIcon="ri-search-line"
        />
        <Paginate
          count={count}
          setOpts={setOpts}
          opts={{ ...opts, replaceAll: true }}
        />
      </Container>

      {/* Table */}
      <Container display="flex" gap="gap-5" flexDirection="flex-col">
        {users.map((item) => {
          return (
            <Container
              rounded="rounded-2xl"
              separator={{ padding: "lg:px-16 px-5 py-5" }}
              align="items-center"
              justify="justify-between"
              display="flex"
              gap="gap-10"
              flexDirection="flex-row"
              flexWrap="flex-nowrap"
              border={{
                size: "border-2",
                color: "border-gray-300",
              }}
              key={item.lastname + item.id}
            >
              <Container
                display="flex"
                gap="gap-x-20"
                align="lg:items-center md:items-center items-start"
                size={{ maxWidth: "max-w-5xl" }}
                flexDirection="lg:flex-row md:flex-row flex-col"
              >
                <img
                  className="inline-block h-12 w-12 rounded-full"
                  src={item.photo + ""}
                  alt="Profile Photo"
                />
                <Text
                  text={`${item.name} ${item.lastname}`}
                  size={{ width: "w-64" }}
                  font={{
                    color: "text-gray-500",
                    whiteSpace: "whitespace-nowrap",
                  }}
                />
                <Text
                  text={`${item.email}`}
                  size={{ width: "w-64" }}
                  font={{
                    color: "text-black",
                    whiteSpace: "whitespace-nowrap",
                  }}
                />
              </Container>
              <Button
                onClick={GoToPanelUser(item.id)}
                text="Ver más"
                font={{ color: "text-white", whiteSpace: "whitespace-nowrap" }}
                size={{ width: "" }}
                separator={{ padding: "px-10" }}
              />
            </Container>
          );
        })}
      </Container>
    </ProtectedRoutes>
  );
};

export default AdminUsersPage;
