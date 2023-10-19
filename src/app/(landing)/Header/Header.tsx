import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { classNames } from "@/app/shared/utils/helpers";
import logo from "@/app/shared/assets/img/logo.png";
import paths from "@/app/shared/routes/paths";
import Container from "@/app/ui/Container";
import Button from "@/app/ui/Button";
import Text from "@/app/ui/Text";
import { useGlobalContext } from "@/app/shared/contexts/GlobalProvider";

const Header = () => {
  const router = useRouter();

  const {
    auth: { isAuthenticated },
  } = useGlobalContext();

  const [showMenu, setShowMenu] = useState<boolean>(false);

  const handleChangeShowMenu = () => setShowMenu((state) => !state);
  const GoToLogin = () => router.push(paths.login);
  const GoToRoot = () => router.push(paths.root);

  return (
    <Container
      flexDirection="flex-row"
      justify="justify-around"
      flexWrap="flex-nowrap"
      align="items-center"
      position="sticky"
      display="flex"
      bgColor="bg-white"
      className="top-0"
      as="header"
      size={{
        height: `h-[100px]`,
        width: "w-full",
      }}
    >
      <Container display="2xl:hidden xl:hidden lg:hidden flex">
        <Button
          remixicon={showMenu ? "ri-close-line" : "ri-align-justify"}
          border={{ size: "border", color: "border-black" }}
          onClick={handleChangeShowMenu}
          bgColor="bg-white"
          toggle={showMenu}
          font={{
            color: "text-black",
            size: "text-xl",
          }}
          size={{
            width: "",
          }}
        />
      </Container>

      <Container onClick={GoToRoot} className="cursor-pointer">
        <Image
          height={logo.height}
          width={logo.width}
          alt="Voist's Logo"
          src={logo.src}
        />
      </Container>
      {/* Menu */}
      <Container
        size={{ width: "w-full" }}
        justify="justify-center"
        align="items-center"
        display="lg:flex hidden"
        as="nav"
      >
        <Container
          display="2xl:grid xl:grid lg:grid 2xl:grid-cols-12"
          size={{ width: "w-full" }}
          justify="justify-around"
          align="items-center"
          as="ul"
          separator={{ padding: "px-5" }}
          flexDirection="flex-row"
        >
          <Container
            display="flex"
            justify="justify-center"
            as="li"
            className="col-start-8"
            size={{ width: "w-full" }}
          >
            <Text
              size={{ width: "" }}
              display="inline"
              className="cursor-pointer"
              text="Menú"
              font={{ weight: "font-semibold" }}
            />
          </Container>
          <Container
            display="flex"
            justify="justify-center"
            size={{ width: "w-full" }}
            className="col-start-9"
            as="li"
          >
            <Text
              size={{ width: "" }}
              display="inline"
              className="cursor-pointer"
              text="Servicios"
              font={{ weight: "font-semibold" }}
            />
          </Container>
          <Container
            display="flex"
            justify="justify-center"
            size={{ width: "w-full" }}
            className="col-start-10"
            as="li"
          >
            <Text
              size={{ width: "" }}
              display="inline"
              className="cursor-pointer"
              text="Nosotros"
              font={{ weight: "font-semibold" }}
            />
          </Container>
          <Container
            display="flex"
            justify="justify-center"
            size={{ width: "w-full" }}
            className="col-start-11"
            as="li"
          >
            <Button
              onClick={GoToLogin}
              font={{
                textTransform: "uppercase",
                color: "text-white",
                weight: "font-semibold",
              }}
              size={{ width: "" }}
              text={isAuthenticated ? "Ir a mi cuenta" : "Iniciar sesión"}
              rounded="rounded-2xl"
            />
          </Container>
        </Container>
      </Container>

      {/* Menu Responsive */}
      <Container
        transition
        position="fixed"
        bgColor="bg-white"
        className={classNames(
          "top-0 left-0",
          showMenu ? "translate-x-0" : "-translate-x-64"
        )}
        size={{ height: "h-screen", width: "w-64" }}
      >
        <Container
          size={{
            width: "w-full",
          }}
          separator={{
            padding: "p-1",
          }}
          display="flex"
          flexWrap="flex-wrap"
          justify="justify-end"
        >
          <Button
            remixicon={showMenu ? "ri-close-line" : "ri-align-justify"}
            border={{ size: "border", color: "border-black" }}
            onClick={handleChangeShowMenu}
            bgColor="bg-white"
            toggle={showMenu}
            font={{
              color: "text-black",
              size: "text-xl",
            }}
            size={{
              width: "",
            }}
          />
          <Container
            size={{ width: "w-full" }}
            justify="justify-center"
            align="items-center"
            display="flex"
            as="nav"
          >
            <Container
              gap="gap-5"
              display="flex"
              separator={{ padding: "p-5" }}
              size={{ width: "w-full" }}
              justify="justify-around"
              align="items-center"
              as="ul"
              flexDirection="flex-col"
            >
              <Container
                display="flex"
                justify="justify-center"
                as="li"
                size={{ width: "w-full" }}
              >
                <Text
                  size={{ width: "" }}
                  display="inline"
                  className="cursor-pointer"
                  text="Menú"
                  font={{ weight: "font-semibold" }}
                />
              </Container>
              <Container
                display="flex"
                justify="justify-center"
                size={{ width: "w-full" }}
                as="li"
              >
                <Text
                  size={{ width: "" }}
                  display="inline"
                  className="cursor-pointer"
                  text="Servicios"
                  font={{ weight: "font-semibold" }}
                />
              </Container>
              <Container
                display="flex"
                justify="justify-center"
                size={{ width: "w-full" }}
                as="li"
              >
                <Text
                  size={{ width: "" }}
                  display="inline"
                  className="cursor-pointer"
                  text="Nosotros"
                  font={{ weight: "font-semibold" }}
                />
              </Container>
              <Container
                display="flex"
                justify="justify-center"
                size={{ width: "w-full" }}
                as="li"
              >
                <Button
                  onClick={GoToLogin}
                  font={{
                    textTransform: "uppercase",
                    color: "text-white",
                    weight: "font-semibold",
                  }}
                  size={{ width: "" }}
                  text={isAuthenticated ? "Ir a mi cuenta" : "Iniciar sesión"}
                  rounded="rounded-2xl"
                />
              </Container>
            </Container>
          </Container>
        </Container>
      </Container>
    </Container>
  );
};

export default Header;
