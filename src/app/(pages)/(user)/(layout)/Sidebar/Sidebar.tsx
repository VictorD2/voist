/* eslint-disable @next/next/no-img-element */
"use client";

import Image from "next/image";
import logoCorto from "@/app/shared/assets/img/logo-corto.png";
import { classNames } from "@/app/shared/utils/helpers";
import routes from "@/app/shared/routes/paths";
import logo from "@/app/shared/assets/img/logo.png";
import { SidebarProps } from "./Sidebar.type";
import Container from "@/app/ui/Container";
import styles from "./Sidebar.module.css";
import ItemGroup from "./ItemGroup";
import { useRouter } from "next/navigation";

const Sidebar = ({ expand = true, setExpand, items = [] }: SidebarProps) => {
  const router = useRouter();

  const GoToRoot = () => router.push(routes.root);

  return (
    <Container position="relative" size={{ height: "h-full", width: "w-full" }}>
      {/* Logo */}
      <Container
        size={{ height: "h-16", width: "w-full" }}
        display="lg:block hidden"
        className="top-0 left-0"
        position="absolute"
        bgColor="bg-white"
      >
        <Container
          border={{ size: "border-none", color: "border-primary" }}
          size={{ height: "h-full" }}
          justify="justify-center"
          align="items-center"
          display="flex"
        >
          {/* Logo Largo */}
          <Container
            className={classNames(
              expand ? "flex" : "hidden group-hover:flex",
              "cursor-pointer"
            )}
            flexDirection="flex-row"
            align="items-center"
            display="flex"
            gap="gap-2"
          >
            <Container
              onClick={GoToRoot}
              font={{
                color: "text-white",
                weight: "font-bold",
                size: "text-2xl",
              }}
            >
              <Image
                height={logo.height}
                width={logo.width}
                alt="Voist's Logo"
                src={logo.src}
              />
            </Container>
          </Container>
          {/* Logo Pequeño */}
          <Container
            onClick={GoToRoot}
            className={classNames(
              !expand ? "flex group-hover:hidden" : "hidden",
              "cursor-pointer"
            )}
            size={{ width: "w-full" }}
            justify="justify-center"
            flexDirection="flex-row"
            flexWrap="flex-nowrap"
            align="items-center"
            display="flex"
            gap="gap-2"
          >
            <Image
              height={logoCorto.height}
              width={logoCorto.width}
              src={logoCorto.src}
              alt="Voist's Logo"
            />
          </Container>
        </Container>
      </Container>
      {/* Items */}
      <Container
        size={{ height: "h-[calc(100%-4rem)]" }}
        flexDirection="flex-col"
        bgColor="bg-white"
        display="flex"
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
          {items.map(({ separator, items }, index) => {
            return (
              <ItemGroup
                setExpand={setExpand}
                key={index + separator}
                separator={separator}
                expand={expand}
                items={items}
              />
            );
          })}
        </Container>
      </Container>
    </Container>
  );
};

export default Sidebar;
