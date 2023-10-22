/* eslint-disable react-hooks/exhaustive-deps */
import { useForm, Controller } from "react-hook-form";
import { FC, useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { getContactService } from "@/app/shared/services/contact.service";
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
import { toast } from "react-toastify";
import CreateRecording from "./CreateRecording";

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
  const [fase, setFase] = useState<FaseType>("SETTING");
  // const [file, setFile] = useState<File>();
  const [arrayBuffer, setArrayBuffer] = useState<Blob>();
  // Method to handle behavior folder's title
  const handleChangeIsEditing = () => setIsEditingTitle((state) => !state);

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
      return await getContactService();
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
    Omit<ClassType, "filename" | "createdAt"> & { contacts: Array<UserType> }
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
        const { contacts, ...rest } = watch();
        // We send the folder properties and contacts shared
        onCreateClass(rest, contacts, arrayBuffer);
      })();
    }
  };

  const handleAudioSubmit = (audio: Blob) => {
    // const encabezado = new ArrayBuffer(44);
    // const vistaEncabezado = new DataView(encabezado);
    // vistaEncabezado.setUint32(0, 0x52494646, true);
    // vistaEncabezado.setUint32(8, 0x57415645, true);
    // vistaEncabezado.setUint32(12, 0x666D7420, true);
    // vistaEncabezado.setUint32(16, 16, true);
    // vistaEncabezado.setUint16(20, 1, true);
    // vistaEncabezado.setUint16(22, 1, true);
    // vistaEncabezado.setUint32(24, 44100, true);
    // vistaEncabezado.setUint32(28, 44100 * 1 * 16, true);
    // vistaEncabezado.setUint16(32, 2, true);
    // vistaEncabezado.setUint16(34, 16, true);
    // vistaEncabezado.setUint32(36, 0x64617461, true);
    // vistaEncabezado.setUint32(40, audio.length * 2, true);


    // const blobData = new Blob([vistaEncabezado, ...audio], { type: "audio/wav" });
    // const archivo = new File([blobData], "mi-audio.wav", {
    //   type: "audio/wav",
    //   endings: "native",
    // });
    // setFile(archivo);
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
          <Button
            font={{ color: "text-white", weight: "font-semibold" }}
            text="Iniciar Grabación"
            onClick={() => {
              setFase("RECORDING");
            }}
          />
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
