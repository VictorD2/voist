/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { NextPage } from "next";
import audioBufferToWav from "audiobuffer-to-wav";
import { useGlobalContext } from "@/app/shared/contexts/GlobalProvider";
import ModalCreateFolder from "../my-space/ModalCreateFolder";
import { getErrorResponse } from "@/app/shared/utils/helpers";
import ModalCreateClass from "../my-space/ModalCreateClass";
import { FolderType } from "@/app/shared/types/folder.type";
import { ButtonProps } from "@/app/ui/Button/Button.type";
import { ClassType } from "@/app/shared/types/class.type";
import { UserType } from "@/app/shared/types/user.type";
import HeaderModal from "@/app/ui/Modal/HeaderModal";
import DropdownMenu from "@/app/ui/DropdownMenu";
import FileFolder from "../my-space/FileFolder";
import Breadcrumbs from "@/app/ui/Breadcrumbs";
import Item from "@/app/ui/DropdownMenu/Item";
import paths from "@/app/shared/routes/paths";
import InputText from "@/app/ui/InputText";
import Container from "@/app/ui/Container";
import Confirm from "@/app/ui/Confirm";
import Button from "@/app/ui/Button";
import Modal from "@/app/ui/Modal";
import {
  FolderApiResponse,
  FoldersApiResponse,
  createFolderService,
  deleteFolderService,
  getFolderService,
  updateFolderService,
} from "@/app/shared/services/folder.services";
import {
  ClassApiResponse,
  ClassesApiResponse,
  createClassService,
  deleteClassService,
  getClassesService,
  updateClassService,
} from "@/app/shared/services/class.services";

interface Link {
  name: string;
  link: string;
}

type FolderWithContacts = FolderType & {
  contacts: Array<Omit<UserType, "roleId" | "state">>;
};
type ClassWithContacts = Omit<
  ClassType,
  | "filename"
  | "createdAt"
  | "duration"
  | "resume"
  | "url_pdf"
  | "url_audio"
  | "userId"
> & {
  contacts: Array<Omit<UserType, "roleId" | "state">>;
};

const ClassesPage: NextPage = () => {
  const params = useSearchParams();
  const router = useRouter();

  const [folderSelected, setFolderSelected] = useState<FolderWithContacts>(); //Folder selected to edit or delete
  const [classSelected, setClassSelected] = useState<ClassWithContacts>(); //Class selected to edit or delete
  const [folders, setFolders] = useState<Array<FolderWithContacts>>([]); //Folder list
  const [classes, setClasses] = useState<Array<ClassWithContacts>>([]); //Class list
  const [routes, setRoutes] = useState<Array<Link>>([]); //Breadcrums
  const [showModalAddFolder, setShowModalAddFolder] = useState<boolean>(false); //Show modal folder
  const [showModalAddClass, setShowModalAddClass] = useState<boolean>(false); //Show modal folder
  const [showMenuAdd, setMenuModalAdd] = useState<boolean>(false); //Show menu folder options
  const [showConfirmFolder, setShowConfirmFolder] = useState<boolean>(false); //Show confirm delete folder
  const [showConfirmClass, setShowConfirmClass] = useState<boolean>(false); //Show confirm delete folder
  const [isActived, setIsActived] = useState<boolean>(false); // Order by button

  const {
    user: { user },
  } = useGlobalContext();

  // Close modal folder
  const handleModalClose = () => {
    setShowModalAddFolder(false);
    setShowModalAddClass(false);
  };

  // When we open the modal folder
  const handleOpenModalCreateFolder = () => {
    setFolderSelected(undefined); //Reset folder form values
    setMenuModalAdd(false); //Hide menu folder options
    setShowModalAddFolder(true); //Show modal
  };

  //When we open the modal class
  const handleOpenModalCreateClass = () => {
    setClassSelected(undefined); //Reset folder form values
    setMenuModalAdd(false); //Hide menu folder options
    setShowModalAddClass(true); //Show modal
  };

  // Options New Button
  const menuAddItems: Array<ButtonProps> = [
    {
      text: "Iniciar grabación",
      remixicon: "ri-mic-line",
      font: {
        size: "text-sm",
      },
      onClick: handleOpenModalCreateClass,
    },
    {
      text: "Crear carpeta",
      remixicon: "ri-folder-add-line",
      font: {
        size: "text-sm",
      },
      onClick: handleOpenModalCreateFolder,
    },
  ];

  // Create folder request
  const { mutate: createFolderMutate } = useMutation<
    FolderApiResponse,
    Error,
    FolderWithContacts
  >(
    async (folderData: FolderWithContacts): Promise<FolderApiResponse> => {
      const { id, contacts, userId, ...rest } = folderData;
      return await createFolderService(
        {
          ...rest,
          folderId: Number(params.get("folder")),
        },
        contacts.map((item) => item.id)
      );
    },
    {
      onSuccess: ({ data }) => {
        toast.success("Carpeta Creada");
        setFolders([...folders, data]);
        setShowModalAddFolder(false);
      },
      onError: (error: any) => {
        toast.warning(getErrorResponse(error));
      },
    }
  );

  // Create class request
  const { mutate: createClassMutate } = useMutation<
    ClassApiResponse,
    Error,
    ClassWithContacts & { file?: File | Blob }
  >(
    async (
      classData: ClassWithContacts & {
        file?: File | Blob;
      }
    ): Promise<ClassApiResponse> => {
      const { id, file, contacts, ...rest } = classData;
      const arrayBuffer = await file!.arrayBuffer();
      const audioContext = new AudioContext();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      const wavBlob = audioBufferToWav(audioBuffer);
      const audioBlob2 = new Blob([wavBlob], { type: "audio/wav" });
      return await createClassService(
        {
          ...rest,
          folderId: Number(params.get("folder")),
        },
        contacts.map((item) => item.id),
        audioBlob2
      );
    },
    {
      onSuccess: ({ data }) => {
        toast.success("Clase Creada");
        setClasses([...classes, data]);
        setShowModalAddClass(false);
      },
      onError: (error: any) => {
        toast.warning(getErrorResponse(error));
      },
    }
  );

  // Update folder request
  const { mutate: editFolderMutate } = useMutation<
    FolderApiResponse,
    Error,
    FolderWithContacts
  >(
    async (folderData: FolderWithContacts): Promise<FolderApiResponse> => {
      const { folderId, contacts, userId, ...rest } = folderData;
      return await updateFolderService(
        rest,
        contacts.map((item) => item.id)
      );
    },
    {
      onSuccess: ({ data }) => {
        toast.success("Carpeta Editada");
        setFolders(
          folders.map((item) => {
            if (item.id === data.id) return data;
            return item;
          })
        );
        setShowModalAddFolder(false);
      },
      onError: (error: any) => {
        toast.warning(getErrorResponse(error));
      },
    }
  );

  // Update folder request
  const { mutate: editClassMutate } = useMutation<
    ClassApiResponse,
    Error,
    ClassWithContacts
  >(
    async (classData: ClassWithContacts): Promise<ClassApiResponse> => {
      const { folderId, contacts, ...rest } = classData;
      return await updateClassService(
        rest,
        contacts.map((item) => item.id)
      );
    },
    {
      onSuccess: ({ data }) => {
        toast.success("Clase Editada");
        setClasses(
          classes.map((item) => {
            if (item.id === data.id) return data;
            return item;
          })
        );
        setShowModalAddClass(false);
      },
      onError: (error: any) => {
        toast.warning(getErrorResponse(error));
      },
    }
  );

  // Delete folder request
  const { mutate: deleteFolderMutate } = useMutation<FolderApiResponse, Error>(
    async (): Promise<FolderApiResponse> => {
      return await deleteFolderService(Number(folderSelected?.id));
    },
    {
      onSuccess: ({ data }) => {
        toast.success("Carpeta Eliminada");
        setFolders(folders.filter((item) => item.id !== folderSelected?.id));
      },
      onError: (error: any) => {
        toast.warning(getErrorResponse(error));
      },
    }
  );

  // Delete class request
  const { mutate: deleteClassMutate } = useMutation<ClassApiResponse, Error>(
    async (): Promise<ClassApiResponse> => {
      return await deleteClassService(Number(classSelected?.id));
    },
    {
      onSuccess: ({ data }) => {
        toast.success("Clase Eliminada");
        setClasses(classes.filter((item) => item.id !== classSelected?.id));
      },
      onError: (error: any) => {
        toast.warning(getErrorResponse(error));
      },
    }
  );

  // Get folders request
  const { refetch } = useQuery<FoldersApiResponse>(
    "GET-FOLDERS",
    async () => {
      return await getFolderService(Number(params.get("folder")));
    },
    {
      onSuccess: ({ data }) => {
        setFolders(data.folders);
        setRoutes(data.routes);
      },
      onError: () => {},
    }
  );

  // Get folders request
  const { refetch: refetchClasses } = useQuery<ClassesApiResponse>(
    "GET-CLASSES",
    async () => {
      return await getClassesService(Number(params.get("folder")));
    },
    {
      onSuccess: ({ data }) => {
        setClasses(data);
      },
      onError: () => {},
    }
  );

  useEffect(() => {
    refetch();
    refetchClasses();
    return () => {};
  }, [params.get("folder")]);

  // Submit form folder modal
  const onSubmitFolder = (folder: FolderType, contacts: Array<Omit<UserType, "role" | "roleId" | "state">>) => {
    folderSelected
      ? editFolderMutate({ ...folder, contacts })
      : createFolderMutate({ ...folder, contacts });
  };

  // Submit form class modal
  const onSubmitClass = (
    classe: Omit<
      ClassType,
      | "filename"
      | "createdAt"
      | "duration"
      | "resume"
      | "url_pdf"
      | "url_audio"
      | "userId"
    >,
    contacts: Array<Omit<UserType, "roleId" | "state">>,
    file?: File | Blob
  ) => {
    classSelected
      ? editClassMutate({ ...classe, contacts })
      : createClassMutate({ ...classe, contacts, file });
  };

  // Change Folder url
  const handleGoFolder = (id: string) => {
    return () => {
      router.push(paths.classFolder(String(id)));
    };
  };

  // Change Folder url
  const handleGoFile = (id: string) => {
    return () => {
      router.push(paths.class(String(id)));
    };
  };

  // When we open the modal to edit folder
  const handleOpenModalFolderEdit = (folder: FolderWithContacts) => {
    return () => {
      setShowModalAddFolder(true);
      setFolderSelected(folder);
    };
  };

  // When we open the modal to edit
  const handleOpenModalClassEdit = (classe: ClassWithContacts) => {
    return () => {
      setShowModalAddClass(true);
      setClassSelected(classe);
    };
  };

  // Whe we open the confirm modal
  const handleConfirmDeleteFolder = (folder: FolderWithContacts) => {
    return () => {
      setShowConfirmFolder(true);
      setFolderSelected(folder);
    };
  };

  // Whe we open the confirm modal
  const handleConfirmDeleteClass = (classe: ClassWithContacts) => {
    return () => {
      setShowConfirmClass(true);
      setClassSelected(classe);
    };
  };

  // When we accept confirm modal delete folder
  const handleDeleteFolder = () => {
    deleteFolderMutate();
  };

  // When we accept confirm modal delete class
  const handleDeleteClass = () => {
    deleteClassMutate();
  };

  return (
    <>
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

        {/* Breadcrumbs */}
        <Breadcrumbs
          routes={[
            { link: paths.classes, name: "Mis clases" },
            ...routes.map((item) => {
              return { ...item, link: paths.classFolder(item.link) };
            }),
          ]}
        />
      </Container>

      {/* Actions */}
      <Container
        separator={{ margin: "mt-10" }}
        size={{ width: "w-full" }}
        display="flex"
        flexDirection="flex-row"
        flexWrap="flex-wrap"
        gap="gap-4"
      >
        <DropdownMenu
          positionAbs="-top-1 -right-[10.7rem]"
          bgColor="bg-transparent"
          size={{ width: "w-44" }}
          show={showMenuAdd}
          buttonNode={
            <Button
              onClick={() => setMenuModalAdd((state) => !state)}
              font={{ color: "group-hover:text-primary text-white" }}
              border={{ size: "border", color: "border-primary" }}
              bgColor="bg-primary hover:bg-white"
              remixicon="ri-add-line"
              size={{ width: "" }}
              className="group"
              ripples={false}
              text="Nuevo"
              transition
            />
          }
        >
          {menuAddItems.map((item, i) => {
            return <Item {...item} key={"item-menu-add-" + i} gap="gap-2" />;
          })}
        </DropdownMenu>

        <Button
          border={{ size: "border", color: "border-gray-200" }}
          remixicon="ri-filter-line"
          text="Añadir filtros"
          font={{ whiteSpace: "whitespace-nowrap" }}
          size={{ width: "" }}
          bgColor="bg-white"
          ripples={false}
        />

        <Button
          border={{ size: "border", color: "border-gray-200" }}
          text="Ordenar por más recientes"
          remixicon="ri-sort-desc"
          font={{ whiteSpace: "whitespace-nowrap" }}
          size={{ width: "" }}
          toggle={isActived}
          bgColor="bg-white"
          ripples={false}
          onClick={() => {
            setIsActived((state) => !state);
          }}
        />
      </Container>

      {/* List */}
      <Container
        separator={{ margin: "mt-10" }}
        justify="justify-evenly"
        flexDirection="flex-row"
        flexWrap="flex-wrap"
        display="flex"
        gap="gap-10"
      >
        {folders.map((item) => {
          return (
            <FileFolder
              options={[
                {
                  text: "Abrir Carpeta",
                  font: {
                    size: "text-sm",
                  },
                  onClick: handleGoFolder(item.id + ""),
                },
                {
                  text: "Editar Configuración",
                  font: {
                    size: "text-sm",
                  },
                  onClick: handleOpenModalFolderEdit(item),
                },
                {
                  text: "Eliminar",
                  bgColor: "bg-red-400 hover:bg-red-500",
                  font: {
                    size: "text-sm",
                    color: "text-white",
                  },
                  onClick: handleConfirmDeleteFolder(item),
                },
              ]}
              key={item.id + item.name}
              id={item.id}
              isFile={false}
              title={item.name}
              updatedAt={item.updatedAt + ""}
            />
          );
        })}
        {classes.map((item) => {
          return (
            <FileFolder
              options={[
                {
                  text: "Abrir Grabación",
                  font: {
                    size: "text-sm",
                  },
                  onClick: handleGoFile(item.id + ""),
                },
                {
                  text: "Editar Configuración",
                  font: {
                    size: "text-sm",
                  },
                  onClick: handleOpenModalClassEdit(item),
                },
                {
                  text: "Eliminar",
                  bgColor: "bg-red-400 hover:bg-red-500",
                  font: {
                    size: "text-sm",
                    color: "text-white",
                  },
                  onClick: handleConfirmDeleteClass(item),
                },
              ]}
              key={item.id + item.name}
              id={item.id}
              isFile={true}
              title={item.name}
              updatedAt={item.updatedAt + ""}
            />
          );
        })}
      </Container>

      {/* Modal Folder*/}
      <Modal
        width="2xl:w-5/12 xl:w-7/12 lg:w-6/12 md:w-8/12 w-full"
        onClose={handleModalClose}
        rounded="rounded-2xl"
        open={showModalAddFolder}
        overflowClosed
        header={
          <HeaderModal
            separator={{ padding: "pt-4 px-10" }}
            font={{
              color: "text-gray-400",
              size: "text-4xl",
            }}
            xIcon
            bgColor="bg-white"
            onClose={handleModalClose}
          />
        }
      >
        <ModalCreateFolder
          contactsSelected={folderSelected?.contacts}
          onCreateFolder={onSubmitFolder}
          defaultValues={folderSelected}
          userId={user.id}
          owner={user}
        />
      </Modal>

      {/* Modal Class*/}
      <Modal
        width="2xl:w-5/12 xl:w-7/12 lg:w-6/12 md:w-8/12 w-full"
        onClose={handleModalClose}
        rounded="rounded-2xl"
        open={showModalAddClass}
        overflowClosed
        header={
          <HeaderModal
            separator={{ padding: "pt-4 px-10" }}
            font={{
              color: "text-gray-400",
              size: "text-4xl",
            }}
            xIcon
            bgColor="bg-white"
            onClose={handleModalClose}
          />
        }
      >
        <ModalCreateClass
          contactsSelected={classSelected?.contacts}
          onCreateClass={onSubmitClass}
          defaultValues={classSelected}
          userId={user.id}
          owner={user}
        />
      </Modal>

      {/* Confirm Folder */}
      <Confirm
        title={`¿Seguro que quieres eliminar ${folderSelected?.name}?`}
        onConfirm={handleDeleteFolder}
        setOpen={setShowConfirmFolder}
        buttonText="Aceptar"
        open={showConfirmFolder}
        type="primary"
        message=""
      />

      {/* Confirm Class */}
      <Confirm
        title={`¿Seguro que quieres eliminar la grabación ${classSelected?.name}?`}
        onConfirm={handleDeleteClass}
        setOpen={setShowConfirmClass}
        buttonText="Aceptar"
        open={showConfirmClass}
        type="primary"
        message=""
      />
    </>
  );
};

export default ClassesPage;
