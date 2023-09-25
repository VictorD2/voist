"use client";

import Container from "@/app/ui/Container";
import { FC } from "react";
import { FileFolderProps } from "./FileFolder.type";
import Icon from "@/app/ui/Icon";
import Text from "@/app/ui/Text";
import moment from "moment";

const FileFolder: FC<FileFolderProps> = (props) => {
  const { id, title, updatedAt, isFile } = props;
  return (
    <Container
      size={{ width: "lg:w-80 md:w-80 w-full" }}
      separator={{ padding: "p-5" }}
      rounded="rounded-lg"
      display="flex"
      flexDirection="flex-row"
      flexWrap="flex-nowrap"
      justify="justify-between"
      gap="gap-5"
      transition
      bgColor="hover:bg-gray-300 bg-gray-200"
    >
      <Container>
        <Icon
          font={{
            color: isFile ? "text-primary" : "text-gray-500",
            size: "text-5xl",
          }}
          remixicon={isFile ? "ri-file-3-fill" : "ri-folder-fill"}
        />
      </Container>
      <Container className="overflow-hidden">
        <Text
          text={title}
          font={{
            wordBreak: "break-keep",
            weight: "font-semibold",
            whiteSpace: "whitespace-nowrap",
          }}
        />
        <Text
          font={{
            whiteSpace: "whitespace-nowrap",
            wordBreak: "break-keep",
          }}
          text={`Ult. act: ${moment(updatedAt).format("DD/MM/YYYY")}`}
        />
      </Container>
      <Icon
        className="cursor-pointer"
        remixicon="ri-more-2-line"
        font={{ size: "text-xl" }}
      />
    </Container>
  );
};

export default FileFolder;
