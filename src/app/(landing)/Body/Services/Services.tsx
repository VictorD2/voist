import Container from "@/app/ui/Container";
import logo from "@/app/shared/assets/img/avion.png";
import Image from "next/image";
import Icon from "@/app/ui/Icon";
import Text from "@/app/ui/Text";

const Services = () => {
  return (
    <Container
      separator={{
        padding: "px-10",
      }}
      as="section"
      bgColor="bg-background"
      size={{ minHeight: "min-h-[calc(100vh-100px)]", width: "w-full" }}
    >
      <Container
        id="funciones"
        font={{
          family: "font-poppins",
        }}
        size={{ width: "w-full" }}
        className="bg-repeat-x"
      >
        <Image
          src={logo.src}
          width={logo.width}
          height={logo.height}
          alt="avion"
          className="lg:w-[10rem] md:w-[8rem] w-[6rem] float-right -z-10 "
        />
        <Container
          separator={{ padding: "pt-0 md:pt-[10rem]" }}
          size={{ width: "w-full", height: "h-full" }}
          justify="justify-items-center md:justify-center"
          display="grid grid-cols-1 md:grid-cols-4"
        >
          <Container
            className="md:col-span-1"
            display="flex"
            align="items-center"
            flexDirection="flex-col"
            separator={{ padding: "p-4" }}
          >
            <Icon
              remixicon="ri-user-voice-fill"
              font={{
                color: "text-white",
                size: "text-3xl",
              }}
              className="border p-4 box-content rounded-[20%] "
              style={{
                background:
                  "linear-gradient(180deg, rgba(255, 200, 5, 0.31) 0%, #FFC805 100%)",
              }}
            />
            <Container
              as="h2"
              font={{ align: "text-center", weight: "font-bold" }}
              separator={{ padding: "py-3" }}
            >
              Transcripción <br />
              Precisa
            </Container>
            <Text
              text="Para ver al detalle tus sesiones de clase."
              font={{
                color: "text-gray-500",
                align: "text-center",
              }}
            />
          </Container>
          <Container className="md:col-span-1 flex items-center flex-col p-4">
            <Icon
              remixicon="ri-align-justify"
              className="border p-4 box-content rounded-[20%]"
              font={{
                color: "text-white",
                size: "text-3xl",
              }}
              style={{
                background:
                  "linear-gradient(180deg, rgba(22, 189, 49, 0.29) 0%, #16BD31 100%)",
              }}
            />
            <Container
              as="h2"
              font={{ align: "text-center", weight: "font-bold" }}
              separator={{ padding: "py-3" }}
            >
              Resumenes <br />
              Inteligentes
            </Container>
            <Text
              font={{
                color: "text-gray-500",
                align: "text-center",
              }}
              text="Te ahorrarán tiempo y destacarán la esencia de las clases."
            />
          </Container>

          <Container className="md:col-span-1 flex items-center flex-col p-4">
            <Icon
              font={{
                color: "text-white",
                size: "text-3xl",
              }}
              remixicon="ri-message-2-fill"
              className="border p-4 box-content rounded-[20%]"
              style={{
                background:
                  "linear-gradient(180deg, rgba(34, 149, 255, 0.39) 0%, #2295FF 100%)",
              }}
            />
            <Container
              as="h2"
              font={{ align: "text-center", weight: "font-bold" }}
              separator={{ padding: "py-3" }}
            >
              Chat <br />
              Interactivo
            </Container>
            <Text
              font={{
                color: "text-gray-500",
                align: "text-center",
              }}
              text="Chat en tiempo real para responder tus dudas sobre la clase."
            />
          </Container>
          <Container className="md:col-span-1 flex items-center flex-col p-4">
            <Icon
              font={{
                color: "text-white",
                size: "text-3xl",
              }}
              remixicon="ri-team-fill"
              className="border p-4 box-content rounded-[20%]"
              style={{
                background:
                  "linear-gradient(180deg, rgba(237, 24, 100, 0.31) 0%, #ED1864 100%)",
              }}
            />
            <Container
              as="h2"
              font={{ align: "text-center", weight: "font-bold" }}
              separator={{ padding: "py-3" }}
            >
              Comparte con <br />
              amigos
            </Container>
            <Text
              font={{
                color: "text-gray-500",
                align: "text-center",
              }}
              className="text-gray-500 text-center"
              text="Podrás compartir tus sesiones de clase con tus amigos."
            />
          </Container>
        </Container>
      </Container>
    </Container>
  );
};

export default Services;
