"use client";

import { useRouter } from "next/navigation";
import moment from "moment";
import { FC } from "react";
import { FileFolderProps } from "./FileFolder.type";
import DropdownMenu from "@/app/ui/DropdownMenu";
import paths from "@/app/shared/routes/paths";
import Item from "@/app/ui/DropdownMenu/Item";
import Container from "@/app/ui/Container";
import Icon from "@/app/ui/Icon";
import Text from "@/app/ui/Text";

const FileFolder: FC<FileFolderProps> = (props) => {
  const { id, title, updatedAt, isFile, options = [] } = props;

  const router = useRouter();

  const handleClickFileFolder = () => {
    if (isFile) router.push(paths.class(String(id)));
    if (!isFile) router.push(paths.classFolder(String(id)));
  };

  return (
    <Container
      size={{ width: "lg:w-80 md:w-80 w-full" }}
      bgColor="hover:bg-gray-300 bg-gray-200"
      separator={{ padding: "p-5" }}
      justify="justify-between"
      flexDirection="flex-row"
      flexWrap="flex-nowrap"
      rounded="rounded-lg"
      display="flex"
      gap="gap-5"
      transition
    >
      <Container
        display="flex"
        flexDirection="flex-row"
        flexWrap="flex-nowrap"
        gap="gap-5"
      >
        <Container onClick={handleClickFileFolder} className="cursor-pointer">
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
              whiteSpace: "whitespace-nowrap",
              wordBreak: "break-keep",
              weight: "font-semibold",
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
      </Container>
      <DropdownMenu
        positionAbs="-top-1 -right-[10.7rem]"
        bgColor="bg-transparent"
        size={{ width: "w-44" }}
        buttonNode={
          <Icon
            className="cursor-pointer"
            remixicon="ri-more-2-line"
            font={{ size: "text-xl" }}
          />
        }
      >
        {options.map((item, i) => {
          return <Item {...item} key={"item-menu-options-" + i} gap="gap-2" />;
        })}
      </DropdownMenu>
    </Container>
  );
};

export default FileFolder;
