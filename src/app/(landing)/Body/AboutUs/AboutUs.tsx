import Container from "@/app/ui/Container";
import Image from "next/image";
import logo from "@/app/shared/assets/img/about-us.png";
import Text from "@/app/ui/Text";

const AboutUs = () => {
  return (
    <Container
      separator={{
        padding: "px-10",
        margin: "mt-[5rem]",
      }}
      justify="justify-center justify-items-center"
      as="section"
      align="items-center"
      display="grid grid-cols-1 md:grid-cols-2"
      font={{ family: "font-poppins" }}
      size={{ minHeight: "min-h-[calc(100vh-100px)]", width: "w-full" }}
    >
      <Container separator={{ padding: "px-2" }}>
        <Image
          src={logo.src}
          width={logo.width}
          height={logo.height}
          alt="about-us"
          className="w-[20rem] md:w-[30rem] pr-10 py-4"
        />
      </Container>
      <Container>
        <Container
          font={{
            size: "text-3xl",
            weight: "font-bold",
            align: "text-start",
          }}
          separator={{
            padding: "pt-10 md:pt-5",
          }}
        >
          ¿Quiénes somos?
        </Container>
        <Text
          font={{
            color: "text-gray-900",
            align: "text-justify",
          }}
          separator={{
            margin: "mt-8",
          }}
          className="leading-9"
        >
          En <span className="text-primary font-bold">Voist,</span> somos un
          grupo apasionado de educadores visionarios. Nuestra misión es
          redefinir la forma en que los estudiantes acceden a retroalimentación
          y aprendizaje. <br /> Estamos orgullosos de formar parte de tu viaje
          educativo y nos dedicamos a proporcionarte una experiencia de
          aprendizaje excepcional. <br /> Juntos, estamos moldeando la manera en
          que estudias y te sumerges en el conocimiento.
        </Text>
      </Container>
    </Container>
  );
};

export default AboutUs;
