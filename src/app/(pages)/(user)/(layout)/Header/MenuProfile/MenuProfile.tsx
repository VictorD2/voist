/* eslint-disable @next/next/no-img-element */
"use client";
import { Menu, Transition } from "@headlessui/react";
import { useRouter, usePathname } from "next/navigation";
import { Fragment } from "react";
import Icon from "../../../../../ui/Icon";
import { useGlobalContext } from "@/app/shared/contexts/GlobalProvider";
import paths from "@/app/shared/routes/paths";
import photoProfile from "@/app/shared/assets/img/contact.png";
import Image from "next/image";
import Text from "@/app/ui/Text";
import Container from "@/app/ui/Container";
import Button from "@/app/ui/Button";
import { ButtonProps } from "@/app/ui/Button/Button.type";
import DropdownMenu from "@/app/ui/DropdownMenu";
import Item from "@/app/ui/DropdownMenu/Item";

const MenuProfile = () => {
  const {
    auth: { setIsAuthenticated },
  } = useGlobalContext();

  const router = useRouter();
  const pathname = usePathname();

  const handleLogOut = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("token");
  };

  const menuItems: Array<ButtonProps> = [
    {
      text: "Gestionar cuenta",
      remixicon: "ri-user-line",
      onClick: () => {
        router.push(paths.perfil);
      },
      bgColor: pathname.includes(paths.perfil)
        ? "bg-primary"
        : "hover:bg-primary bg-white",
      font: {
        color: pathname.includes(paths.perfil)
          ? "text-white"
          : "group-hover:text-white text-gray-900",
      },
    },
    {
      text: "Cerrar Sesión",
      remixicon: "ri-logout-box-line",
      onClick: handleLogOut,
    },
  ];

  return (
    <DropdownMenu
      bgColor="bg-transparent"
      buttonNode={
        <>
          <Image
            className="inline-block h-12 w-12 rounded-full ring-2 ring-primary"
            src={photoProfile.src}
            alt="Profile Photo"
            width={photoProfile.width}
            height={photoProfile.height}
          />
          <Text
            text="Usuario Apellido"
            className="hidden md:block md:ml-2 truncate max-w-[8rem]"
          />
          <Icon
            remixicon="ri-arrow-down-s-line"
            font={{ color: "text-violet-200 hover:text-violet-100" }}
            className="ml-2 -mr-1"
            aria-hidden="true"
          />
        </>
      }
    >
      {menuItems.map((item, i) => {
        return <Item {...item} key={"item-menu-profile-" + i} />;
      })}
    </DropdownMenu>
  );
};

export default MenuProfile;
