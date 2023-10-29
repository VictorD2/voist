"use client";
import paths from "@/app/shared/routes/paths";
import Button from "@/app/ui/Button";
import Container from "@/app/ui/Container";
import Image from "next/image";
import { useRouter } from "next/navigation";
import logo from "@/app/shared/assets/img/join.png";

const Join = () => {
  const router = useRouter();

  const GoToRegister = () => router.push(paths.register);
  return (
    <Container
      separator={{
        padding: "px-10",
        margin: "mt-[5rem]",
      }}
      justify="justify-center justify-items-center"
      as="section"
      align="items-center"
      display="grid grid-cols-1 md:grid-cols-3"
      font={{ family: "font-poppins" }}
      size={{ minHeight: "min-h-[calc(100vh-100px)]", width: "w-full" }}
    >
      <Container className="col-span-2 w-full flex items-center flex-col justify-center px-6">
        <Container as="h2" className="text-3xl font-bold pb-10 text-center">
          ¿Interesado lo suficiente como para comenzar?
        </Container>
        <Button
          text="ÚNETE"
          separator={{ padding: "px-6 py-2" }}
          size={{ height: "", width: "" }}
          bgColor="bg-orange-500 hover:bg-orange-400"
          font={{ color: "text-white", weight: "font-bold" }}
          rounded="rounded-full"
        />
      </Container>
      <Container className="col-span-1 flex justify-center">
        <Image
          src={logo.src}
          width={logo.width}
          height={logo.height}
          alt="join us"
          className="rotate-90 md:rotate-0 w-[15rem] md:w-[25rem]"
        />
      </Container>
    </Container>
  );
};

export default Join;
