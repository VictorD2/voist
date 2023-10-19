import logo from "@/app/shared/assets/img/logo.png";
import Container from "@/app/ui/Container";
import Image from "next/image";

const Footer = () => {
  return (
    <Container
      display="flex"
      bgColor="bg-gray-100"
      justify="justify-center"
      align="items-center"
      as="footer"
      size={{
        height: "h-[152px]",
      }}
    >
      <Image
        height={logo.height}
        width={logo.width}
        alt="Voist's Logo"
        src={logo.src}
      />
    </Container>
  );
};

export default Footer;
