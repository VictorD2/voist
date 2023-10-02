import { FC } from "react";
import { ContactSharedProps } from "./ContactShared.type";
import Container from "@/app/ui/Container";
import Text from "@/app/ui/Text";
import Icon from "@/app/ui/Icon";

const ContactShared: FC<ContactSharedProps> = (props) => {
  const { email, isOwner, id, lastname, name, onDelete } = props;

  const handleDelete = () => {
    if (onDelete) onDelete(id);
  };

  return (
    <Container
      border={{ size: "border", color: "border-gray-300" }}
      display="flex"
      flexDirection="flex-row"
      flexWrap="flex-nowrap"
      align="items-center"
      separator={{ padding: "py-2 px-4" }}
      rounded="rounded-2xl"
      gap="gap-5"
      justify="justify-between"
    >
      <Container
        rounded="rounded-full"
        bgColor="bg-primary"
        display="flex"
        align="items-center"
        justify="justify-center"
        size={{ width: "w-10", height: "h-10" }}
      >
        <Text
          display="inline"
          size={{ width: "" }}
          text={"UI"}
          font={{ color: "text-white", textTransform: "uppercase" }}
        />
      </Container>
      <Text
        className="overflow-hidden"
        font={{
          whiteSpace: "whitespace-nowrap",
          size: "text-sm",
          weight: "font-bold",
        }}
        size={{ width: "w-40" }}
        text={`${name} ${lastname}`}
      />
      <Text
        className="overflow-hidden"
        size={{ width: "w-32" }}
        font={{ color: "text-gray-500", size: "text-xs" }}
        text={`${email}`}
      />
      <Text
        font={{
          color: "text-primary",
          textTransform: "uppercase",
          size: "text-sm",
          weight: "font-semibold",
        }}
        size={{ width: "" }}
        text={`${isOwner ? "Propietario" : "Invitado"}`}
      />
      <Icon
        onClick={handleDelete}
        className="cursor-pointer"
        remixicon="ri-indeterminate-circle-line"
        font={{ size: "text-3xl", color: "text-red-500" }}
      />
    </Container>
  );
};

export default ContactShared;
