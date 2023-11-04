/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState } from "react";
import { NextPage } from "next";
import moment from "moment";
import Breadcrumbs from "@/app/ui/Breadcrumbs";
import paths from "@/app/shared/routes/paths";
import Transcription from "./Transcription";
import Container from "@/app/ui/Container";
import Button from "@/app/ui/Button";
import Text from "@/app/ui/Text";
import Summary from "./Summary";
import Chat from "./Chat";
import { useParams } from "next/navigation";
import { useMutation, useQuery } from "react-query";
import {
  createChatResumen,
  getChatResumen,
  getClassService,
} from "@/app/shared/services/class.services";
import { ClassType } from "@/app/shared/types/class.type";
import { UserType } from "@/app/shared/types/user.type";
import Adjuntos from "./Adjuntos";
import { AxiosResponse } from "axios";
import ProtectedRoutes from "@/app/shared/routes/ProtectedRoutes";

const ClassPage: NextPage = () => {
  const params = useParams();
  type MODE = "SUMMARY" | "TRANSCRIPTION" | "CHAT" | "ADJUNTOS";

  const [mode, setMode] = useState<MODE>("SUMMARY");
  const [classe, setClasse] = useState<
    ClassType & { contacts: Array<UserType> }
  >({
    id: 0,
    createdAt: "",
    duration: "",
    filename: "",
    folderId: 0,
    name: "",
    resume: "",
    updatedAt: "",
    url_audio: "",
    url_pdf: "",
    contacts: [],
    userId: 0,
  });

  // Getting contacts
  const { refetch } = useQuery<any>(
    "GET-CONTACTS",
    async () => {
      return await getClassService(+params.id);
    },
    {
      onSuccess: ({ data }) => {
        setClasse(data);
        if (data.resume === "") {
          getResumenChat(data.url_pdf);
        }
      },
      onError: () => {},
    }
  );

  // Flask api
  const { mutate: getResumenChat, isLoading: isLoadingFlaskApiResumen } =
    useMutation<
      AxiosResponse<{ answer: string }, { answer: string }>,
      Error,
      string
    >(
      async (urlPdf): Promise<AxiosResponse<{ answer: string }>> => {
        return await getChatResumen(urlPdf);
      },
      {
        onSuccess: ({ data: { answer } }) => {
          createResumenChat(answer);
        },
        onError: (error: any) => {},
      }
    );

  // Nest api
  const {
    mutate: createResumenChat,
    isLoading: isLoadingNestApiCreateResumen,
  } = useMutation<AxiosResponse<string, string>, Error, string>(
    async (content): Promise<AxiosResponse<string>> => {
      return await createChatResumen(content, classe.id);
    },
    {
      onSuccess: ({ data }) => {
        setClasse({ ...classe, resume: data });
      },
      onError: (error: any) => {},
    }
  );

  const handleChangeMode = (mod: MODE) => {
    return () => {
      setMode(mod);
    };
  };

  useEffect(() => {
    refetch();
    return () => {};
  }, []);

  if (classe.id === 0) {
    return <></>;
  }

  return (
    <ProtectedRoutes code="P02">
      <Container
        separator={{ margin: "mb-10" }}
        size={{ width: "w-full" }}
        flexDirection="flex-col"
        display="flex"
        gap="gap-5"
      >
        {/* Title */}
        <Breadcrumbs
          routes={[
            { link: paths.classes, name: "Mis clases" },
            { link: paths.class(classe.id + ""), name: classe.name },
          ]}
        />
      </Container>
      <Container
        display="flex"
        flexWrap="lg:flex-nowrap flex-wrap"
        size={{ width: "w-full" }}
        flexDirection="flex-row"
      >
        <Container
          separator={{ padding: "lg:px-30 md:px-10 px-0" }}
          size={{ width: "w-[35rem]" }}
          flexDirection="flex-col"
          display="flex"
        >
          <Container
            justify="justify-center"
            flexDirection="flex-col"
            bgColor="bg-gray-200"
            rounded="rounded-2xl"
            display="inline-flex"
            align="items-start"
            gap="gap-2"
            separator={{ padding: "p-8" }}
          >
            <Text
              text="Datos de la sesión:"
              font={{
                weight: "font-semibold",
                color: "text-primary",
                size: "text-lg",
              }}
            />
            <Container>
              <Text
                text="Título: "
                font={{
                  weight: "font-semibold",
                  size: "text-md",
                }}
                size={{ width: "" }}
                display="inline"
              />
              <Text text={classe.name} size={{ width: "" }} display="inline" />
            </Container>
            <Container>
              <Text
                text="Fecha: "
                font={{
                  weight: "font-semibold",
                  size: "text-md",
                }}
                size={{ width: "" }}
                display="inline"
              />
              <Text
                text={moment(classe.createdAt).format("DD/MM/YYYY")}
                size={{ width: "" }}
                display="inline"
              />
            </Container>
            <Container>
              {/* <Text
                text="Hora inicio: "
                font={{
                  weight: "font-semibold",
                  size: "text-md",
                }}
                size={{ width: "" }}
                display="inline"
              />
              <Text text="16:20:00 hrs" size={{ width: "" }} display="inline" /> */}
            </Container>
            <Container>
              {/* <Text
                text="Hora fin: "
                font={{
                  weight: "font-semibold",
                  size: "text-md",
                }}
                size={{ width: "" }}
                display="inline"
              />
              <Text text="17:20:00 hrs" size={{ width: "" }} display="inline" /> */}
            </Container>
            <Container>
              <Text
                text="Personas con acceso:"
                font={{
                  weight: "font-semibold",
                  size: "text-md",
                }}
                size={{ width: "" }}
                display="inline"
              />
              <Container as="ul">
                {classe.contacts.map((item) => {
                  return (
                    <Container
                      key={item.name + item.id}
                      as="li"
                      font={{ indentText: "indent-4" }}
                    >
                      {`* ${item.name} ${item.lastname}`}
                    </Container>
                  );
                })}
              </Container>
            </Container>
          </Container>
          <Container separator={{ margin: "my-10" }}>
            <Button
              toggle={mode === "SUMMARY"}
              onClick={handleChangeMode("SUMMARY")}
              bgColor="hover:bg-primary bg-white"
              border={{
                size: "border",
                color: "border-gray-200",
              }}
              font={{
                size: "text-lg",
                color: "group-hover:text-white text-gray-900",
              }}
              rounded="rounded-lg"
              gap="gap-5"
              justify="justify-start"
              text="Resumen"
              size={{ width: "w-60" }}
              className="group"
              remixicon="ri-menu-line"
            />
            <Button
              onClick={handleChangeMode("TRANSCRIPTION")}
              remixicon="ri-voice-recognition-line"
              bgColor="hover:bg-primary bg-white"
              toggle={mode === "TRANSCRIPTION"}
              justify="justify-start"
              text="Transcripción"
              rounded="rounded-lg"
              className="group"
              gap="gap-5"
              font={{
                color: "group-hover:text-white text-gray-900",
                size: "text-lg",
              }}
              border={{
                color: "border-gray-200",
                size: "border",
              }}
              size={{ width: "w-60" }}
            />
            <Button
              bgColor="hover:bg-primary bg-white"
              onClick={handleChangeMode("CHAT")}
              toggle={mode === "CHAT"}
              remixicon="ri-chat-3-line"
              justify="justify-start"
              size={{ width: "w-60" }}
              rounded="rounded-lg"
              className="group"
              text="Chat IA"
              gap="gap-5"
              font={{
                color: "group-hover:text-white text-gray-900",
                size: "text-lg",
              }}
              border={{
                color: "border-gray-200",
                size: "border",
              }}
            />
            <Button
              bgColor="hover:bg-primary bg-white"
              onClick={handleChangeMode("ADJUNTOS")}
              toggle={mode === "ADJUNTOS"}
              remixicon="ri-folder-2-line"
              justify="justify-start"
              size={{ width: "w-60" }}
              rounded="rounded-lg"
              className="group"
              text="Archivos adjuntos"
              gap="gap-5"
              font={{
                color: "group-hover:text-white text-gray-900",
                size: "text-lg",
              }}
              border={{
                color: "border-gray-200",
                size: "border",
              }}
            />
          </Container>
        </Container>

        <Container size={{ width: "w-full" }}>
          {mode === "SUMMARY" && (
            <Summary
              isLoading={
                isLoadingFlaskApiResumen || isLoadingNestApiCreateResumen
              }
              resume={classe.resume}
            />
          )}
          {mode === "ADJUNTOS" && <Adjuntos />}
          {mode === "TRANSCRIPTION" && <Transcription url={classe.url_pdf} />}
          {mode === "CHAT" && (
            <Chat urlPdf={classe.url_pdf} classId={classe.id} />
          )}
        </Container>
      </Container>
    </ProtectedRoutes>
  );
};

export default ClassPage;
