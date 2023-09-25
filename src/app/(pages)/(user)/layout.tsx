"use client";
import ProtectedRoutes from "@/app/shared/routes/ProtectedRoutes";
import { classNames } from "@/app/shared/utils/helpers";
import Container from "@/app/ui/Container";
import { ReactNode, useState } from "react";
import Sidebar from "./(layout)/Sidebar";
import Header from "./(layout)/Header";

const Layout = ({ children }: { children: ReactNode }) => {
  const [expand, setExpand] = useState(true);

  return (
    <ProtectedRoutes>
      <Container size={{ width: "w-full" }}>
        {/* LeftSide */}
        <Container
          as="aside"
          size={{ height: "h-screen" }}
          position="fixed"
          bgColor="bg-white"
          className={classNames(
            expand
              ? "lg:w-[240px] lg:translate-x-0 -translate-x-[240px]"
              : "lg:w-[80px] w-[240px] translate-x-[0px]",
            "hover:md:w-[240px] transition-all duration-300 lg:translate-x-0 md:-translate-x-[240px]",
            "lg:translate-y-0 translate-y-16",
            "group z-30"
          )}
        >
          <Sidebar expand={expand} />
        </Container>

        {/* RightSide */}
        <Container
          display="flex"
          flexDirection="flex-col"
          size={{ minHeight: "min-h-full" }}
          separator={{
            padding: expand
              ? "lg:pl-[240px] pl-[0px]"
              : "lg:pl-[80px] pl-[0px]",
          }}
          className="transition-all duration-300"
        >
          {/* Header */}
          <Container
            as="header"
            shadow={{
              size: "shadow-lg",
            }}
            position="sticky"
            className="top-0 z-10"
            bgColor="bg-white"
            size={{
              height: "h-16",
            }}
          >
            <Header setExpand={setExpand} expand={expand} />
          </Container>

          {/* Content */}
          <Container
            as="main"
            size={{
              width: "w-full",
              minHeight: "min-h-[calc(100vh-4rem)]",
            }}
            separator={{ padding: "px-5 py-6" }}
            bgColor="bg-background"
          >
            {children}
          </Container>
        </Container>
      </Container>
    </ProtectedRoutes>
  );
};

export default Layout;
