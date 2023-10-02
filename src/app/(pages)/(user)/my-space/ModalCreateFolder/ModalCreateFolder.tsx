import Button from "@/app/ui/Button";
import Container from "@/app/ui/Container";
import InputText from "@/app/ui/InputText";
import Text from "@/app/ui/Text";
import ContactShared from "../ContactShared";

const ModalCreateFolder = () => {
  return (
    <Container
      separator={{ padding: "p-10" }}
      display="flex"
      flexDirection="flex-col"
      gap="gap-10"
    >
      <InputText placeholder="Añadir contacto" />
      <Container display="flex" flexDirection="flex-col" gap="gap-4">
        <Text text="Personas con acceso" font={{ weight: "font-bold" }} />
        <ContactShared
          id={1}
          name="Maria del Carmen"
          lastname="Vega"
          email="mcarmen@gmail.com"
          isOwner
        />
      </Container>
      <Button
        font={{ color: "text-white", weight: "font-semibold" }}
        text="Guardar"
      />
    </Container>
  );
};

export default ModalCreateFolder;
