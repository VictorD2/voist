/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useState } from "react";
import Container from "@/app/ui/Container";
import InputText from "@/app/ui/InputText";
import { ChatProps } from "./Chat.type";
import Message from "./Message";
import styles from "./Chat.module.css";
import { ConversationType } from "@/app/shared/types/conversation.type";
import { useMutation, useQuery } from "react-query";
import {
  ConversationApiResponse,
  ConversationsApiResponse,
  createConversationService,
  getConversationsService,
} from "@/app/shared/services/conversation.service";
import { getErrorResponse } from "@/app/shared/utils/helpers";
import { toast } from "react-toastify";
import { getChatAnswer } from "@/app/shared/services/class.services";

const Chat: FC<ChatProps> = (props) => {
  const { classId, urlPdf } = props;

  const [conversations, setConversations] = useState<Array<ConversationType>>(
    []
  );
  const [question, setQuestion] = useState("");

  const { refetch } = useQuery<ConversationsApiResponse>(
    "GET-CONVERSATIONS",
    async () => {
      return await getConversationsService(classId);
    },
    {
      onSuccess: ({ data }) => {
        setConversations(data);
      },
      onError: () => {},
    }
  );
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value);
  };

  const handleKeyBoardInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isLoadingAnswerRequest || isLoadingRequest) return;
    if (e.key === "Enter") {
      getAnswerChatMutate(e.currentTarget.value);
    }
  };

  type ChatType = {
    answer: string;
    question: string;
  };
  const { mutate: createConversationMutate, isLoading: isLoadingRequest } =
    useMutation<ConversationApiResponse, Error, ChatType>(
      async ({ answer, question }): Promise<ConversationApiResponse> => {
        return await createConversationService(classId, question, answer);
      },
      {
        onSuccess: ({ data }) => {
          setConversations([...conversations, data]);
          setQuestion("");
        },
        onError: (error: any) => {
          toast.warning(getErrorResponse(error));
        },
      }
    );

  const { mutate: getAnswerChatMutate, isLoading: isLoadingAnswerRequest } =
    useMutation<any, Error, string>(
      async (questionParam) => {
        toast.warning(getErrorResponse(questionParam));
        return await getChatAnswer(urlPdf, questionParam);
      },
      {
        onSuccess: ({ data }, questionRes) => {
          // setConversations([...conversations, data]);
          createConversationMutate({
            answer: data.answer,
            question: questionRes,
          });
        },
        onError: (error: any, questionParam) => {
          toast.warning(getErrorResponse(error));
          getAnswerChatMutate(questionParam);
        },
      }
    );

  useEffect(() => {
    refetch();
    return () => {};
  }, [classId]);

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
      className={styles.chat}
      display="flex"
      flexDirection="flex-col"
      gap="gap-8"
      justify="justify-start"
    >
      <Container
        separator={{ padding: "pr-5" }}
        className={"overflow-y-auto overflow-x-hidden " + styles.chatScroll}
        size={{
          minHeight: "min-h-[60vh]",
          height: "h-[60vh]",
        }}
      >
        {conversations.map((item) => {
          return (
            <>
              <Message
                content={item.question}
                createdAt={item.createdAt}
                isUserMessage
              />
              <Message
                content={item.answer}
                createdAt={item.createdAt}
                isUserMessage={false}
              />
            </>
          );
        })}
        {(isLoadingAnswerRequest || isLoadingRequest) && (
          <>
            <Message
              className="animate-pulse"
              content=""
              createdAt=""
              isUserMessage
            />
            <Message
              className="animate-pulse"
              content=""
              createdAt=""
              isUserMessage={false}
            />
          </>
        )}
      </Container>

      <InputText
        onKeyUp={handleKeyBoardInput}
        value={question}
        onChange={handleChangeInput}
        floatIcon="ri-send-plane-2-line"
        eventFloatIcon={() => {
          if (isLoadingAnswerRequest || isLoadingRequest) return;
          if (question !== "" && question.length > 3) {
            getAnswerChatMutate(question);
          }
        }}
        rounded="rounded-xl"
        border={{
          color: "border-gray-300",
        }}
      />
    </Container>
  );
};

export default Chat;
