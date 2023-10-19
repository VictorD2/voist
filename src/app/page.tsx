"use client";

import { useRouter } from "next/navigation";
import Footer from "./(landing)/Footer";
import Header from "./(landing)/Header";
import Button from "./ui/Button";
import Container from "./ui/Container";
import Text from "./ui/Text";
import paths from "./shared/routes/paths";

export default function Home() {
  const SECTION_HEIGHT = "min-h-[calc(100vh-100px)]";
  const router = useRouter();

  const GoToRegister = () => router.push(paths.register);

  return (
    <>
      <Header />
      <Container size={{ minHeight: SECTION_HEIGHT }} as="main">
        {/* Section 1 */}
        <Container
          size={{ minHeight: SECTION_HEIGHT, width: "w-full" }}
          flexDirection="lg:flex-row flex-col"
          flexWrap="flex-nowrap"
          display="flex"
          as="section"
        >
          <Container
            separator={{
              padding: "pt-16 pl-14",
            }}
            size={{ width: "w-full", minHeight: SECTION_HEIGHT }}
          >
            <Container display="flex" gap="gap-5" flexDirection="flex-col">
              <Text
                text="Transforma tu"
                font={{
                  weight: "font-extrabold",
                  size: "text-5xl",
                  align: "lg:text-left text-center",
                }}
              />
              <Text
                text="experiencia de"
                font={{
                  weight: "font-extrabold",
                  size: "text-5xl",
                  align: "lg:text-left text-center",
                }}
              />
              <Text
                text="Estudio"
                font={{
                  color: "text-primary",
                  weight: "font-extrabold",
                  size: "text-5xl",
                  align: "lg:text-left text-center",
                }}
              />
            </Container>
            <Container separator={{ margin: "mt-5" }}>
              <Text
                font={{
                  color: "text-gray-500",
                  size: "text-lg",
                  align: "lg:text-left text-center",
                }}
                text="Potencia tu aprendizaje grabando tus clases y obteniendo una retroalimentación excepcional"
              />
            </Container>

            <Container
              separator={{ padding: "p-10" }}
              display="flex"
              justify="justify-center"
              align="items-center"
            >
              <Button
                separator={{ padding: "p-7" }}
                text="Crea una cuenta"
                onClick={GoToRegister}
                bgColor="bg-amber-500"
                rounded="rounded-2xl"
                size={{ width: "" }}
                font={{
                  textTransform: "uppercase",
                  weight: "font-bold",
                  color: "text-white",
                }}
              />
            </Container>
          </Container>
          <Container
            size={{ width: "w-full", minHeight: SECTION_HEIGHT }}
          ></Container>
        </Container>
        {/* Section 2 */}
        <Container
          as="section"
          bgColor="bg-green-500"
          size={{ minHeight: SECTION_HEIGHT, width: "w-full" }}
        ></Container>
        {/* Section 3 */}
        <Container
          as="section"
          bgColor="bg-yellow-500"
          size={{ minHeight: SECTION_HEIGHT, width: "w-full" }}
        ></Container>
        {/* Section 4 */}
        <Container
          as="section"
          bgColor="bg-blue-500"
          size={{ minHeight: SECTION_HEIGHT, width: "w-full" }}
        ></Container>
        {/* Section 5 */}
        <Container
          as="section"
          bgColor="bg-violet-500"
          size={{ minHeight: SECTION_HEIGHT, width: "w-full" }}
        ></Container>
      </Container>
      <Footer />
    </>
  );
}
