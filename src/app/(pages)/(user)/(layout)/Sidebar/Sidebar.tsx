/* eslint-disable @next/next/no-img-element */
"use client";

import ItemGroup from "./ItemGroup";
import { ItemGroupType } from "./ItemGroup/ItemGroup.type";
import { SidebarProps } from "./Sidebar.type";
import styles from "./Sidebar.module.css";
import logo from "@/app/shared/assets/img/logo.png";
import logoCorto from "@/app/shared/assets/img/logo-corto.png";
import { classNames } from "@/app/shared/utils/helpers";
import Container from "@/app/ui/Container";
import { paths } from "@/app/shared/routes/paths.user";
import Image from "next/image";

const navigation: Array<ItemGroupType> = paths;

const Sidebar = ({ expand = true }: SidebarProps) => {
  return (
    <Container position="relative" size={{ height: "h-full", width: "w-full" }}>
      {/* Logo */}
      <Container
        position="absolute"
        display="lg:block hidden"
        size={{ height: "h-16", width: "w-full" }}
        bgColor="bg-white"
        className="top-0 left-0"
      >
        <Container
          display="flex"
          justify="justify-center"
          align="items-center"
          size={{ height: "h-full" }}
          border={{ size: "border-none", color: "border-primary" }}
        >
          {/* Logo Largo */}
          <Container
            className={classNames(expand ? "flex" : "hidden group-hover:flex")}
            display="flex"
            flexDirection="flex-row"
            align="items-center"
            gap="gap-2"
          >
            <Container
              font={{
                color: "text-white",
                weight: "font-bold",
                size: "text-2xl",
              }}
            >
              <Image
                src={logo.src}
                width={logo.width}
                height={logo.height}
                alt="Voist's Logo"
              />
            </Container>
          </Container>
          {/* Logo Pequeño */}
          <Container
            className={classNames(
              !expand ? "flex group-hover:hidden" : "hidden",
              "w-full flex-nowrap"
            )}
            display="flex"
            flexDirection="flex-row"
            align="items-center"
            justify="justify-center"
            gap="gap-2"
          >
            <Image
              src={logoCorto.src}
              width={logoCorto.width}
              height={logoCorto.height}
              alt="Voist's Logo"
            />
          </Container>
        </Container>
      </Container>
      {/* Items */}
      <Container
        display="flex"
        bgColor="bg-white"
        flexDirection="flex-col"
        size={{ height: "h-[calc(100%-4rem)]" }}
        className={classNames(
          "lg:translate-y-16 -translate-y-0",
          styles.sidebar
        )}
      >
        <Container
          separator={{
            padding: "pt-5 pl-0.5",
          }}
          className={classNames("overflow-y-auto", styles.sidebarScroll)}
        >
          {navigation.map(({ separator, items }, index) => {
            return (
              <ItemGroup
                items={items}
                expand={expand}
                separator={separator}
                key={index + separator}
              />
            );
          })}
        </Container>
      </Container>
    </Container>
  );
};

export default Sidebar;
