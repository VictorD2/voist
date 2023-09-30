import React, { FC } from "react";
import { HeaderProps } from "./Header.type";
import Container from "@/app/ui/Container";
import { classNames } from "@/app/shared/utils/helpers";
import MenuProfile from "./MenuProfile";

const Header: FC<HeaderProps> = (props) => {
  const { expand, setExpand } = props;

  const handleChangeExpand = () => setExpand((value) => !value);

  return (
    <Container
      display="flex"
      flexDirection="flex-row"
      size={{ height: "h-full", width: "w-full" }}
      separator={{
        padding: "px-8",
      }}
      justify="justify-between"
      align="items-center"
    >
      <Container
        size={{ width: "w-1/2" }}
        flexDirection="flex-row"
        display="flex"
        gap="gap-10"
      >
        <Container
          display="flex"
          flexDirection="flex-row"
          justify="justify-between"
          position="relative"
          align="items-center"
          gap="gap-2"
        >
          <i
            className={classNames(
              expand ? "ri-menu-2-line" : "ri-close-fill",
              "text-xl absolute z-[120] cursor-pointer"
            )}
            onClick={handleChangeExpand}
          />
        </Container>
      </Container>

      <Container
        display="flex"
        flexDirection="flex-row"
        size={{ width: "w-1/2" }}
        justify="justify-end"
        align="items-center"
        gap="gap-6"
        separator={{
          padding: "pr-4",
        }}
      >
        <MenuProfile />
      </Container>
    </Container>
  );
};

export default Header;
