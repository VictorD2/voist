"use client";
import paths from "@/app/shared/routes/paths";
import Button from "@/app/ui/Button";
import { useRouter } from "next/navigation";
import logo from "@/app/shared/assets/img/Hero.png";
import Image from "next/image";
import Container from "@/app/ui/Container";
import Text from "@/app/ui/Text";

const Hero = () => {
  const router = useRouter();

  const GoToRegister = () => router.push(paths.register);

  return (
    <Container
      separator={{
        padding: "px-10",
      }}
      as="section"
      size={{ minHeight: "min-h-[calc(100vh-100px)]", width: "w-full" }}
      flexDirection="lg:flex-row flex-col"
      flexWrap="flex-nowrap"
      display="flex"
    >
      <Container
        font={{ family: "font-poppins" }}
        display="grid grid-cols-1 md:grid-cols-10"
        separator={{ padding: "px-8", margin: "mt-[5rem] md:mt-0" }}
      >
        <Container
          display="flex md:col-span-6"
          justify="justify-center"
          flexDirection="flex-col"
          font={{ align: "text-center md:text-left" }}
        >
          <Container
            as="h1"
            display="flex"
            flexDirection="flex-col"
            font={{ size: "text-3xl md:text-6xl", weight: "font-bold" }}
            className="leading-[3rem] md:leading-[5rem]"
          >
            <span>Transforma tu</span>
            <span> experiencia de</span>
            <span className="text-primary">Estudio</span>
          </Container>

          <Text
            text="Potencia tu aprendizaje grabando tus clases y obteniendo una retroalimentación excepcional."
            font={{
              color: "text-gray-500",
              align: "text-center md:text-start",
            }}
            separator={{ padding: "py-6" }}
          />
          <Container
            display="flex"
            align="items-center"
            justify="justify-center"
            separator={{ padding: "pt-8" }}
          >
            <Button
              separator={{ padding: "px-6 py-2" }}
              text="Crea una cuenta"
              transition
              onClick={GoToRegister}
              bgColor="bg-orange-300 hover:bg-orange-400"
              rounded="rounded-full"
              size={{ height: "h-16", width: "" }}
              font={{
                textTransform: "uppercase",
                weight: "font-bold",
                color: "text-white",
                align: "text-center",
              }}
            />
          </Container>
        </Container>
        <div className="flex md:items-center justify-center md:col-span-4">
          <Image
            width={logo.width}
            height={logo.height}
            src={logo.src}
            alt="hero"
            className=" h-[35vh] md:h-[35vh] xl:h-[60vh] lg:h-[50vh] py-3 box-border mt-[5rem] md:mt-0"
          />
        </div>
      </Container>
    </Container>
  );
};

export default Hero;
