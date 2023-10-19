"use client";
import { useState } from "react";
import { NextPage } from "next";
import Breadcrumbs from "@/app/ui/Breadcrumbs";
import paths from "@/app/shared/routes/paths";
import Transcription from "./Transcription";
import Container from "@/app/ui/Container";
import Button from "@/app/ui/Button";
import Text from "@/app/ui/Text";
import Summary from "./Summary";
import Chat from "./Chat";

const ClassPage: NextPage = () => {
  type MODE = "SUMMARY" | "TRANSCRIPTION" | "CHAT";

  const [mode, setMode] = useState<MODE>("SUMMARY");

  const handleChangeMode = (mod: MODE) => {
    return () => {
      setMode(mod);
    };
  };

  return (
    <Container>
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
                  weight: "font-semibold",
                  size: "text-md",
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
                  weight: "font-semibold",
                  size: "text-md",
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
                  weight: "font-semibold",
                  size: "text-md",
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
                  weight: "font-semibold",
                  size: "text-md",
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
