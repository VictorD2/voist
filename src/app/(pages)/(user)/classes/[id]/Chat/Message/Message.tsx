import moment from "moment";
import { FC } from "react";
import { MessageProps } from "./Message.type";
import Container from "@/app/ui/Container";
import Text from "@/app/ui/Text";
import { classNames, mergeObjects } from "@/app/shared/utils/helpers";
import {
  defaultFontAnswer,
  defaultFontQuestion,
  defaultSize,
} from "./Message.default";

const Message: FC<MessageProps> = (props) => {
  const {
    content,
    createdAt,
    isUserMessage,
    className = "",
    fontAnswer = {},
    fontQuestion = {},
    size = {},
  } = props;

  const fontAnswerStyle = mergeObjects(defaultFontAnswer, fontAnswer);
  const fontQuestionStyle = mergeObjects(defaultFontQuestion, fontQuestion);
  const sizeStyle = mergeObjects(defaultSize, size);

  return (
    <Container
      className={classNames(className)}
      size={{ width: "w-full" }}
      display="flex"
      flexDirection="flex-col"
      gap="gap-2"
      align={isUserMessage ? "items-end" : "items-start"}
    >
      <Container
        position="relative"
        size={{ maxWidth: "max-w-md" }}
        bgColor={isUserMessage ? "bg-primary" : "bg-gray-200"}
        rounded="rounded-lg"
        separator={{ padding: "p-5" }}
      >
        <Container
          as="span"
          position="absolute"
          size={{
            width: "w-[1rem]",
            height: "h-[1rem]",
          }}
          bgColor={isUserMessage ? "bg-primary" : "bg-gray-200"}
          rounded={isUserMessage ? "rounded-br-full" : "rounded-bl-full"}
          className={isUserMessage ? "top-0 -right-2" : "top-0 -left-3"}
        />
        <Text
          font={{
            color: isUserMessage
              ? fontAnswerStyle.color
              : fontQuestionStyle.color,
            size: fontAnswerStyle.size,
          }}
          size={{ minWidth: "min-w-[20rem]" }}
          text={content}
        />
      </Container>
      <Container size={{ maxWidth: "max-w-md", width: "w-[28rem]" }}>
        <Text
          font={{
            align: isUserMessage
              ? fontQuestionStyle.align
              : fontQuestionStyle.align,
            color: "text-gray-500",
            size: "text-xs",
          }}
          text={
            createdAt ? moment(createdAt).format("DD/MM/YYYY HH:mm:ss a") : ""
          }
        />
      </Container>
    </Container>
  );
};

export default Message;
