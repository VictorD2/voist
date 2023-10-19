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
      display="grid grid-cols-12"
      align="items-center"
      separator={{ padding: "py-2 px-4" }}
      rounded="rounded-2xl"
      gap="gap-2"
    >
      <Container
        className="col-span-1"
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
        className="text-ellipsis overflow-hidden col-span-4"
        font={{
          whiteSpace: "whitespace-nowrap",
          size: "text-sm",
          weight: "font-bold",
        }}
        text={`${name} ${lastname}`}
      />
      <Text
        className="text-ellipsis overflow-hidden col-span-4"
        font={{
          color: "text-gray-500",
          size: "text-xs",
          whiteSpace: "whitespace-nowrap",
        }}
        text={email}
      />
      <Text
        className="text-ellipsis overflow-hidden col-span-2"
        font={{
          color: "text-primary",
          textTransform: "uppercase",
          size: "text-sm",
          weight: "font-semibold",
        }}
        text={`${isOwner ? "Propietario" : "Invitado"}`}
      />
      {!isOwner && (
        <Icon
          onClick={handleDelete}
          className="cursor-pointer col-span-1"
          remixicon="ri-indeterminate-circle-line"
          font={{ size: "text-3xl", color: "text-red-500" }}
        />
      )}
    </Container>
  );
};

export default ContactShared;
