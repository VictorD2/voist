import { FC } from "react";
import Image from "next/image";
import contactPhoto from "@/app/shared/assets/img/contact.png";
import { ContactCardProps } from "./ContactCard.type";
import Container from "@/app/ui/Container";
import Text from "@/app/ui/Text";
import Icon from "@/app/ui/Icon";

const ContactCard: FC<ContactCardProps> = (props) => {
  const { lastname, email, id, name, onDelete } = props;
  return (
    <Container
      rounded="rounded-md"
      position="relative"
      display="flex"
      justify="justify-center"
      flexDirection="flex-col"
      separator={{ padding: "p-5" }}
      bgColor="bg-gray-100"
      size={{ width: "w-[15rem]" }}
      gap="gap-2"
    >
      <Container display="flex" justify="justify-center">
        <Image
          alt="Contact Photo"
          className="rounded-full"
          src={contactPhoto.src}
          width={contactPhoto.width}
          height={contactPhoto.height}
        />
      </Container>
      <Text font={{ align: "text-center", size: "text-xs" }} text={email} />
      <Text
        font={{ align: "text-center", size: "text-lg" }}
        text={`${name} ${lastname}`}
      />
      <Container position="absolute" className="top-5 right-5">
        <Icon
          onClick={() => {
            if (onDelete) onDelete({ email, id, lastname, name });
          }}
          className="cursor-pointer"
          remixicon="ri-indeterminate-circle-line"
          font={{ size: "text-3xl", color: "text-red-500" }}
        />
      </Container>
    </Container>
  );
};

export default ContactCard;
