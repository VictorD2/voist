import logo from "@/app/shared/assets/img/chica.png";
import Container from "@/app/ui/Container";
import Text from "@/app/ui/Text";
import Image from "next/image";

const Offer = () => {
  return (
    <Container
      as="section"
      separator={{
        padding: "px-10",
      }}
      size={{ minHeight: "min-h-[calc(100vh-100px)]", width: "w-full" }}
    >
      <Container
        size={{ width: "w-full" }}
        display="grid grid-cols-1 md:grid-cols-2"
        align="items-center"
        justify="justify-center justify-items-center"
        font={{ family: "font-poppins" }}
        separator={{ margin: "mt-[1.5rem] md:mt-[0rem]", padding: "px-8 py-8" }}
        id="info"
      >
        <Container>
          <Container
            as="h1"
            font={{
              size: "text-3xl",
              weight: "font-bold",
              align: "text-start",
            }}
          >
            ¿Qué ofrecemos?
          </Container>
          <Text
            font={{ color: "text-gray-500", align: "text-justify" }}
            separator={{ margin: "mt-8", padding: "pr-4" }}
            className="leading-9"
          >
            Al utilizar nuestra aplicación, experimentarás una notable mejora en
            tu proceso de aprendizaje. <br /> Dispondrás de la información de
            tus clases al alcance de tu mano, lo que reducirá significativamente
            el tiempo dedicado al estudio. Además, obtendrás apuntes precisos y
            detallados, evitando malentendidos y errores de interpretación.{" "}
            <br /> Tus notas de clase estarán seguras en la nube, lo que
            significa que podrás acceder a ellas desde cualquier lugar y en
            cualquier momento. <br /> Por último, gracias a nuestro chat de
            consulta, podrás aclarar tus dudas en tiempo real, lo que potenciará
            tu comprensión y te ayudará a obtener un aprendizaje más efectivo.
          </Text>
        </Container>
        <Container separator={{ padding: "px-2" }}>
          <Image
            src={logo.src}
            width={logo.width}
            height={logo.height}
            alt="chica"
            className="w-[20rem] md:w-[35rem] pl-4 py-4 box-content"
          />
        </Container>
      </Container>
    </Container>
  );
};

export default Offer;
