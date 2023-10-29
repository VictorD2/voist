/* eslint-disable react-hooks/exhaustive-deps */
import { useForm, Controller } from "react-hook-form";
import React, { FC, useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { getMyContactService } from "@/app/shared/services/contact.service";
import ClickOutSideComponent from "@/app/shared/hooks/useClickOutside";
import { ModalCreateClassType } from "./ModalCreateClass.type";
import { ClassType } from "@/app/shared/types/class.type";
import { UserType } from "@/app/shared/types/user.type";
import { ClassResolver } from "./ModalCreateClass.yup";
import ContactShared from "../ContactShared";
import Container from "@/app/ui/Container";
import InputText from "@/app/ui/InputText";
import Button from "@/app/ui/Button";
import Text from "@/app/ui/Text";
import List from "@/app/ui/List";
import Icon from "@/app/ui/Icon";
import CreateRecording from "./CreateRecording";
import { toast } from "react-toastify";

const ModalCreateClass: FC<ModalCreateClassType> = (props) => {
  type FaseType = "SETTING" | "RECORDING" | "CREATED";
  const {
    defaultValues = {
      filename: "",
      folderId: 0,
      id: 0,
      name: "Grabación 1",
      userId: 0,
      createdAt: "",
    },
    onCreateClass,
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
  const [fase, setFase] = useState<FaseType>(
    defaultValues.id === 0 ? "SETTING" : "CREATED"
  );
  const fileInput = useRef<HTMLInputElement>(null);
  // const [file, setFile] = useState<File>();
  const [arrayBuffer, setArrayBuffer] = useState<Blob | File>();
  // Method to handle behavior folder's title
  const handleChangeIsEditing = () => setIsEditingTitle((state) => !state);

  const handleClickUploadAudio = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };

  const handleChangeInputAudio = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.currentTarget.files
      ? e.currentTarget.files[0]
      : undefined;
    if (selectedFile) {
      if (selectedFile.type !== "audio/wav")
        return toast.warning("El formato de audio debe ser .wav");
      setArrayBuffer(selectedFile);
      setFase("CREATED");
      // Puedes realizar acciones con el archivo seleccionado aquí
    }
  };

  // To manage the value of filter
  const handleChangeInputSearch = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFilter(e.target.value);
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

  // To manage the form
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
  } = useForm<
    Omit<
      ClassType,
      | "filename"
      | "createdAt"
      | "duration"
      | "updatedAt"
      | "url_pdf"
      | "resume"
      | "url_audio"
    > & {
      contacts: Array<Omit<UserType, "roleId" | "state">>;
    }
  >({
    resolver: ClassResolver,
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
    if (onCreateClass) {
      handleSubmit(() => {
        const { contacts, userId, ...rest } = watch();
        // We send the folder properties and contacts shared
        onCreateClass(rest, contacts, arrayBuffer);
      })();
    }
  };

  const handleAudioSubmit = (audio: Blob) => {
    setArrayBuffer(audio);
    setFase("CREATED");
  };

  return (
    <>
      <Container
        separator={{ padding: "px-10 pb-10" }}
        display="flex"
        flexDirection="flex-col"
        gap="gap-10"
      >
        {fase !== "RECORDING" ? (
          <>
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
                          user.email
                            .toLowerCase()
                            .includes(filter.toLowerCase())
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
          </>
        ) : (
          <CreateRecording
            getAudio={handleAudioSubmit}
            audioName={watch("name")}
          />
        )}
        {/* Button Submit */}
        {fase === "SETTING" && (
          <Container
            display="flex"
            flexDirection="flex-row"
            flexWrap="flex-nowrap"
            gap="gap-10"
          >
            <Button
              font={{ color: "text-white", weight: "font-semibold" }}
              text="Iniciar Grabación"
              remixicon="ri-mic-line"
              onClick={() => {
                setFase("RECORDING");
              }}
            />
            <Button
              onClick={handleClickUploadAudio}
              font={{ color: "text-white", weight: "font-semibold" }}
              text="Subir Audio"
              remixicon="ri-upload-2-line"
            />
            <input
              onChange={handleChangeInputAudio}
              ref={fileInput}
              type="file"
              className="hidden"
            />
          </Container>
        )}
        {fase === "CREATED" && (
          <Button
            font={{ color: "text-white", weight: "font-semibold" }}
            text="Guardar"
            onClick={handleFormSubmit}
          />
        )}
      </Container>
    </>
  );
};

export default ModalCreateClass;
