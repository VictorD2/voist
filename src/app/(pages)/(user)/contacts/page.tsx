"use client";

import ProtectedRoutes from "@/app/shared/routes/ProtectedRoutes";
import Container from "@/app/ui/Container";
import InputText from "@/app/ui/InputText";
import { NextPage } from "next";
import contacts from "./contacts.json";
import ContactCard from "./ContactCard";
import Breadcrumbs from "@/app/ui/Breadcrumbs";
import paths from "@/app/shared/routes/paths";

const ContactsPage: NextPage = () => {
  return (
    <ProtectedRoutes>
      <Container
        size={{ width: "w-full" }}
        display="flex"
        flexDirection="flex-col"
        gap="gap-5"
      >
        {/* Search */}
        <Container
          size={{ width: "w-full" }}
          display="flex"
          flexDirection="flex-row"
          justify="justify-center"
          separator={{ padding: "p-1" }}
        >
          <InputText
            placeholder="Buscar..."
            size={{ width: "lg:w-5/12 md:w-7/12 w-full" }}
            responsiveIcon="ri-search-line"
          />
        </Container>

        {/* Title */}
        <Breadcrumbs routes={[{ link: paths.contacts, name: "Mis contactos" }]} />
      </Container>

      {/* Form Add Contact */}
      <Container
        separator={{ margin: "mt-5" }}
        size={{ width: "w-full" }}
        as="form"
      >
        <InputText
          placeholder="Agregar contacto"
          separator={{ padding: "px-3 py-3" }}
        />
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
          return <ContactCard key={item.id} {...item} />;
        })}
      </Container>
    </ProtectedRoutes>
  );
};

export default ContactsPage;
