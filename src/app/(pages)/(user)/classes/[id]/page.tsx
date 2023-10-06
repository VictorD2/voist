"use client";
import { NextPage } from "next";
import paths from "@/app/shared/routes/paths";
import Breadcrumbs from "@/app/ui/Breadcrumbs";
import Container from "@/app/ui/Container";
import { useState } from "react";
import Summary from "./Summary";
import Chat from "./Chat";
import Transcription from "./Transcription";
import Text from "@/app/ui/Text";
import Button from "@/app/ui/Button";

const ClassPage: NextPage = () => {
  type MODE = "SUMMARY" | "TRANSCRIPTION" | "CHAT";

  const [mode, setMode] = useState<MODE>("SUMMARY");

  const handleChangeMode = (mod: MODE) => {
    return (e: React.MouseEvent) => {
      setMode(mod);
    };
  };

  return (
    <Container>
      <Container
        size={{ width: "w-full" }}
        display="flex"
        flexDirection="flex-col"
        gap="gap-5"
        separator={{ margin: "mb-10" }}
      >
        {/* Title */}
        <Breadcrumbs
          routes={[
            { link: paths.classes, name: "Mis clases" },
            { link: paths.class("1"), name: "Grabación 1" },
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
          display="flex"
          flexDirection="flex-col"
        >
          <Container
            bgColor="bg-gray-200"
            rounded="rounded-2xl"
            display="inline-flex"
            justify="justify-center"
            align="items-start"
            flexDirection="flex-col"
            gap="gap-2"
            separator={{ padding: "p-8" }}
          >
            <Text
              text="Datos de la sesión:"
              font={{
                color: "text-primary",
                size: "text-lg",
                weight: "font-semibold",
              }}
            />
            <Container>
              <Text
                text="Título: "
                font={{
                  size: "text-md",
                  weight: "font-semibold",
                }}
                size={{ width: "" }}
                display="inline"
              />
              <Text
                text="Mi grabación 1"
                size={{ width: "" }}
                display="inline"
              />
            </Container>
            <Container>
              <Text
                text="Fecha: "
                font={{
                  size: "text-md",
                  weight: "font-semibold",
                }}
                size={{ width: "" }}
                display="inline"
              />
              <Text text="12/09/23" size={{ width: "" }} display="inline" />
            </Container>
            <Container>
              <Text
                text="Hora inicio: "
                font={{
                  size: "text-md",
                  weight: "font-semibold",
                }}
                size={{ width: "" }}
                display="inline"
              />
              <Text text="16:20:00 hrs" size={{ width: "" }} display="inline" />
            </Container>
            <Container>
              <Text
                text="Hora fin: "
                font={{
                  size: "text-md",
                  weight: "font-semibold",
                }}
                size={{ width: "" }}
                display="inline"
              />
              <Text text="17:20:00 hrs" size={{ width: "" }} display="inline" />
            </Container>
            <Container>
              <Text
                text="Personas con acceso:"
                font={{
                  size: "text-md",
                  weight: "font-semibold",
                }}
                size={{ width: "" }}
                display="inline"
              />
              <Container as="ul">
                <Container as="li" font={{ indentText: "indent-4" }}>
                  {"* Juan Alva"}
                </Container>
                <Container as="li" font={{ indentText: "indent-4" }}>
                  {"* Maria Vega"}
                </Container>
                <Container as="li" font={{ indentText: "indent-4" }}>
                  {"* Camila Silva"}
                </Container>
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
              toggle={mode === "TRANSCRIPTION"}
              onClick={handleChangeMode("TRANSCRIPTION")}
              className="group"
              text="Transcripción"
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
              size={{ width: "w-60" }}
              remixicon="ri-voice-recognition-line"
            />
            <Button
              toggle={mode === "CHAT"}
              onClick={handleChangeMode("CHAT")}
              className="group"
              text="Chat IA"
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
              remixicon="ri-chat-3-line"
              justify="justify-start"
              size={{ width: "w-60" }}
            />
          </Container>
        </Container>
        <Container size={{ width: "w-full" }}>
          {mode === "SUMMARY" && <Summary />}
          {mode === "TRANSCRIPTION" && <Transcription />}
          {mode === "CHAT" && <Chat />}
        </Container>
      </Container>
    </Container>
  );
};

export default ClassPage;
