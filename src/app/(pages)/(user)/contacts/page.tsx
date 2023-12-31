/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useMutation, useQuery } from "react-query";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { NextPage } from "next";
import ClickOutSideComponent from "@/app/shared/hooks/useClickOutside";
import { getAllContactsService } from "@/app/shared/services/contact.service";
import { getErrorResponse } from "@/app/shared/utils/helpers";
import { UserType } from "@/app/shared/types/user.type";
import Breadcrumbs from "@/app/ui/Breadcrumbs";
import paths from "@/app/shared/routes/paths";
import Container from "@/app/ui/Container";
import InputText from "@/app/ui/InputText";
import ContactCard from "./ContactCard";
import Confirm from "@/app/ui/Confirm";
import List from "@/app/ui/List";
import {
  ContactApiDeleteResponse,
  ContactApiResponse,
  createContactService,
  deleteContactService,
  getMyContactService,
} from "@/app/shared/services/contact.service";
import ProtectedRoutes from "@/app/shared/routes/ProtectedRoutes";

const ContactsPage: NextPage = () => {
  const [contacts, setContacts] = useState<
    Array<Omit<UserType, "roleId" | "state">>
  >([]);
  const [contactSelected, setContactSelected] =
    useState<Omit<UserType, "roleId" | "state">>();
  const [showConfirm, setShowConfirm] = useState<boolean>(false);

  const [contactsSearch, setContactsSearch] = useState<
    Array<Omit<UserType, "roleId" | "state">>
  >([]);
  const [showListSearch, setShowListSearch] = useState<boolean>(false);
  const [isLoadedSearch, setIsLoadedSearch] = useState<boolean>(false);
  const [isLoadingSearch, setIsLoadingSearch] = useState<boolean>(false);

  const [filter, setFilter] = useState("");

  const handleChangeInputSearch = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      setFilter(e.target.value);
      if (e.target.value.length < 3) {
        setContactsSearch([]);
        setIsLoadedSearch(false);
      }
      if (e.target.value.length >= 3 && !isLoadedSearch) {
        setIsLoadingSearch(true);
        const { data } = await getAllContactsService(e.target.value);
        setIsLoadingSearch(false);
        setContactsSearch(data);
        setIsLoadedSearch(true);
      }
      setShowListSearch(true);
    } catch (error) {
      setIsLoadedSearch(true);
      setIsLoadingSearch(false);
      setShowListSearch(true);
    }
  };

  const { mutate: createContactMutate } = useMutation<
    ContactApiResponse,
    Error,
    number
  >(
    async (userId: number): Promise<ContactApiResponse> => {
      return await createContactService(userId);
    },
    {
      onSuccess: ({ data }) => {
        toast.success("Contacto Agregado");
        setContacts([...contacts, data]);
      },
      onError: (error: any) => {
        toast.warning(getErrorResponse(error));
      },
    }
  );

  const handleConfirmDelete = (user: Omit<UserType, "state" | "role" | "roleId">) => {
    setShowConfirm(true);
    setContactSelected(user);
  };

  const { mutate: deleteContactMutate } = useMutation<
    ContactApiDeleteResponse,
    Error
  >(
    async (): Promise<ContactApiDeleteResponse> => {
      return await deleteContactService(Number(contactSelected?.id));
    },
    {
      onSuccess: ({ data }) => {
        toast.success("Contacto Eliminado");
        setContacts(contacts.filter((item) => data !== item.id));
      },
      onError: (error: any) => {
        toast.warning(getErrorResponse(error));
      },
    }
  );

  // Getting contacts
  const { refetch } = useQuery<any>(
    "GET-CONTACTS",
    async () => {
      return await getMyContactService();
    },
    {
      onSuccess: ({ data }) => {
        setContacts(data);
      },
      onError: () => {},
    }
  );

  useEffect(() => {
    refetch();
    return () => {};
  }, []);

  const handleClickOption = (user: Omit<UserType, "roleId" | "state">) => {
    setShowListSearch(false);
    createContactMutate(user.id);
  };

  const handleDeleteFolder = () => {
    deleteContactMutate();
  };

  return (
    <ProtectedRoutes code="P04">
      <Container
        size={{ width: "w-full" }}
        display="flex"
        flexDirection="flex-col"
        gap="gap-5"
      >

        {/* Title */}
        <Breadcrumbs
          routes={[{ link: paths.contacts, name: "Mis contactos" }]}
        />
      </Container>

      {/* Form Add Contact */}
      <Container
        separator={{ margin: "mt-5" }}
        size={{ width: "w-full" }}
        as="form"
      >
        {/* SEARCH */}
        <ClickOutSideComponent callback={() => setShowListSearch(false)}>
          {/* Input Search */}
          <Container position="relative">
            <InputText
              onFocus={() => setShowListSearch(true)}
              onChange={handleChangeInputSearch}
              placeholder="Agregar contacto"
              separator={{ padding: "px-3 py-3" }}
            />
            {/* Lista de busqueda */}
            {showListSearch && (
              <List<Omit<UserType, "roleId" | "state"> & { fullname: string }>
                className="absolute z-20"
                isLoading={isLoadingSearch}
                size={{
                  width: "w-full",
                  height: "h-[20rem]",
                }}
                values={["fullname", "email"]}
                onSelectItem={handleClickOption}
                list={contactsSearch
                  .map((item) => {
                    return {
                      ...item,
                      fullname: `${item.name} ${item.lastname}`,
                    };
                  })
                  .filter((user) => {
                    return (
                      user.fullname
                        .toLowerCase()
                        .includes(filter.toLowerCase()) ||
                      user.email.toLowerCase().includes(filter.toLowerCase())
                    );
                  })}
              />
            )}
          </Container>
        </ClickOutSideComponent>
      </Container>

      {/* List Contacts */}
      <Container
        display="flex"
        gap="gap-x-16 gap-y-10"
        separator={{ margin: "mt-10" }}
        flexDirection="flex-row"
        flexWrap="flex-wrap"
        justify="justify-evenly"
      >
        {contacts.map((item) => {
          return (
            <ContactCard
              onDelete={handleConfirmDelete}
              key={item.id}
              {...item}
            />
          );
        })}
      </Container>

      {/* Confirm */}
      <Confirm
        message=""
        buttonText="Aceptar"
        title={`¿Seguro que quieres eliminar de tus contactos a ${contactSelected?.name} ${contactSelected?.lastname}?`}
        onConfirm={handleDeleteFolder}
        open={showConfirm}
        setOpen={setShowConfirm}
        type="primary"
      />
    </ProtectedRoutes>
  );
};

export default ContactsPage;
