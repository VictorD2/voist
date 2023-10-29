"use client";
import { FC } from "react";
import { SummaryProps } from "./Summary.type";
import Container from "@/app/ui/Container";
import Icon from "@/app/ui/Icon";
import Text from "@/app/ui/Text";

const Summary: FC<SummaryProps> = (props) => {
  const { resume, isLoading = false } = props;
  if (isLoading) {
    return (
      <Container
        size={{
          minHeight: "min-h-screen",
          width: "w-full",
        }}
        bgColor="bg-white"
        display="flex"
        flexDirection="flex-col"
        justify="justify-center"
        align="items-center"
      >
        <Container className="animate-spin" separator={{ padding: "p-10" }}>
          <Icon
            remixicon="ri-loader-4-line"
            font={{ color: "text-primary", size: "text-9xl" }}
          />
        </Container>
        <Text
          font={{ align: "text-center" }}
          text="Se está generando el resumen por favor no salga de la página."
        />
      </Container>
    );
  }
  return <iframe className="w-full h-screen" src={resume}></iframe>;
};

export default Summary;
