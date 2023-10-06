import Container from "@/app/ui/Container";
import Message from "./Message";
import InputText from "@/app/ui/InputText";

const Chat = () => {
  return (
    <Container
      border={{
        color: "border-gray-300",
        size: "border-2",
      }}
      separator={{
        padding: "p-5",
      }}
      rounded="rounded-lg"
      display="flex"
      flexDirection="flex-col"
      gap="gap-8"
      justify="justify-start"
    >
      <Message
        content="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi accusamus labore modi beatae vel velit odit, dolores tenetur quo, explicabo officia laboriosam qui! Voluptatum rerum corporis voluptate inventore odio quia.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi accusamus labore modi beatae vel velit odit, dolores tenetur quo, explicabo officia laboriosam qui! Voluptatum rerum corporis voluptate inventore odio quia."
        createdAt={new Date()}
        isUserMessage
      />
      <Message
        content="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi accusamus labore modi beatae vel velit odit, dolores tenetur quo, explicabo officia laboriosam qui! Voluptatum rerum corporis voluptate inventore odio quia.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi accusamus labore modi beatae vel velit odit, dolores tenetur quo, explicabo officia laboriosam qui! Voluptatum rerum corporis voluptate inventore odio quia."
        createdAt={new Date()}
        isUserMessage={false}
      />
      <InputText
        floatIcon="ri-send-plane-2-line"
        rounded="rounded-xl"
        border={{
          color: "border-gray-300",
          size: "border-2",
        }}
      />
    </Container>
  );
};

export default Chat;
