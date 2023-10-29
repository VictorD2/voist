/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Controller, useForm } from "react-hook-form";
import { FC, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getMyContactService } from "@/app/shared/services/contact.service";
import ClickOutSideComponent from "@/app/shared/hooks/useClickOutside";
import { ModalCreateFolderType } from "./ModalCreateFolder.type";
import { FolderResolver } from "./ModalCreateFolder.yup";
import { FolderType } from "@/app/shared/types/folder.type";
import { UserType } from "@/app/shared/types/user.type";
import ContactShared from "../ContactShared";
import Container from "@/app/ui/Container";
import InputText from "@/app/ui/InputText";
import Button from "@/app/ui/Button";
import List from "@/app/ui/List";
import Text from "@/app/ui/Text";
import Icon from "@/app/ui/Icon";

const ModalCreateFolder: FC<ModalCreateFolderType> = (props) => {
  const {
    onCreateFolder,
    defaultValues = {
      id: 0,
      name: "Carpeta 1",
      folderId: 0,
    },
    owner = {
      id: 0,
      email: "",
      lastname: "",
      name: "",
    },
    contactsSelected = [],
    userId = 0,
  } = props;

  const [contacts, setContacts] = useState<Array<UserType>>([]); // Contacts List
  const [showListSearch, setShowListSearch] = useState<boolean>(false); //Contacts Search List
  const [filter, setFilter] = useState(""); // We use this to filter in Contacts List
  const [isEditingTitle, setIsEditingTitle] = useState<boolean>(false); //To change the behavior of the name of the folder

  // Method to handle behavior folder's title
  const handleChangeIsEditing = () => setIsEditingTitle((state) => !state);

  // To manage the value of filter
  const handleChangeInputSearch = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFilter(e.target.value);
  };

  // To manage the form
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
  } = useForm<
    FolderType & {
      contacts: Array<Omit<UserType, "role" | "roleId" | "state">>;
    }
  >({
    resolver: FolderResolver,
    defaultValues: {
      id: defaultValues.id,
      name: defaultValues.name,
      userId: userId,
      folderId: defaultValues.folderId,
      contacts: contactsSelected,
    },
  });

  // When the form is submited
  const handleFormSubmit = () => {
    if (onCreateFolder) {
      handleSubmit(() => {
        const { contacts, ...rest } = watch();
        // We send the folder properties and contacts shared
        onCreateFolder(rest, contacts);
      })();
    }
  };

  // When we add a new contact to shared list
  const handleClickOption = (user: UserType) => {
    setShowListSearch(false);
    if (watch("contacts").some((item) => item.id === user.id)) return;
    setValue("contacts", [...watch("contacts"), user]);
  };

  // There is a list of contacts, this methods delete a user from the list
  const handleRemoveFromContacts = (id: number) => {
    setValue(
      "contacts",
      watch("contacts").filter((item) => item.id !== id)
    );
  };

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

  return (
    <>
      <Container
        separator={{ padding: "px-10 pb-10" }}
        display="flex"
        flexDirection="flex-col"
        gap="gap-10"
      >
        <Container
          display="flex"
          flexDirection="flex-row"
          flexWrap="flex-nowrap"
          justify="justify-center"
          align="items-center"
          gap="gap-5"
        >
          {/* Title Behavior */}
          {isEditingTitle ? (
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <InputText
                  size={{ width: "w-96" }}
                  placeholder="Escribe el nombre de la carpeta"
                  helpText={{ text: errors.name?.message }}
                  onChange={field.onChange}
                  value={field.value}
                  name="name"
                  required
                />
              )}
            />
          ) : (
            <Text
              size={{ width: "" }}
              text={watch("name")}
              font={{ size: "text-2xl", weight: "font-semibold" }}
              display="inline"
            />
          )}

          {/* Title Pencil icon */}
          <Icon
            onClick={handleChangeIsEditing}
            remixicon="ri-edit-2-line"
            font={{ color: "text-gray-400", size: "text-3xl" }}
          />
        </Container>

        {/* Search */}
        <ClickOutSideComponent callback={() => setShowListSearch(false)}>
          <Container className="relative">
            {/* Input Search */}
            <InputText
              onFocus={() => setShowListSearch(true)}
              onChange={handleChangeInputSearch}
              placeholder="Agregar contacto"
              value={filter}
            />
            {/* Search List */}
            {showListSearch && (
              <List<UserType & { fullname: string }>
                className="absolute"
                size={{
                  width: "w-full",
                  height: "h-[11rem]",
                }}
                values={["fullname", "email"]}
                onSelectItem={handleClickOption}
                list={contacts
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

        <Container display="flex" flexDirection="flex-col" gap="gap-4">
          <Text text="Personas con acceso" font={{ weight: "font-bold" }} />
          {/* Owner */}
          <ContactShared
            id={owner.id}
            name={owner.name}
            lastname={owner.lastname}
            email={owner.email}
            isOwner
          />

          {/* List shared contacts */}
          {watch("contacts").map((item) => {
            return (
              <ContactShared
                key={item.name + item.lastname}
                id={item.id}
                name={item.name}
                lastname={item.lastname}
                email={item.email}
                isOwner={false}
                onDelete={handleRemoveFromContacts}
              />
            );
          })}
        </Container>

        {/* Button Submit */}
        <Button
          font={{ color: "text-white", weight: "font-semibold" }}
          text="Guardar"
          onClick={handleFormSubmit}
        />
      </Container>
    </>
  );
};

export default ModalCreateFolder;
