"use client";

import Container from "@/app/ui/Container";
import Icon from "@/app/ui/Icon";

const Loading = () => {
  return (
    <Container
      size={{
        minHeight: "min-h-screen",
        width: "w-full",
      }}
      bgColor="bg-white"
      display="flex"
      justify="justify-center"
      align="items-center"
    >
      <Container className="animate-spin" separator={{ padding: "p-10" }}>
        <Icon
          remixicon="ri-loader-4-line"
          font={{ color: "text-primary", size: "text-9xl" }}
        />
      </Container>
    </Container>
  );
};

export default Loading;
