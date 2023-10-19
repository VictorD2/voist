import React, { FC } from "react";
import { useRouter } from "next/navigation";
import { mergeObjects } from "@/app/shared/utils/helpers";
import { BreadcrumbsProps } from "./Breadcrumbs.type";
import { defaultFont } from "./Breadcrumbs.default";
import Container from "../Container";
import Icon from "../Icon";

const Breadcrumbs: FC<BreadcrumbsProps> = (props) => {
  const { routes, font = {}, colorFirst = "text-primary" } = props;

  const navigate = useRouter();
  const handleClickContainer = (e: React.MouseEvent<HTMLDivElement>) => {
    const link = e.currentTarget.dataset.link as string;
    if (link !== "#") navigate.push(link);
  };

  const fontStyle = mergeObjects(defaultFont, font);

  return (
    <Container
      align="items-center"
      size={{ width: "w-full" }}
      separator={{ padding: "px-[20px]" }}
      justify="justify-start"
      display="flex"
      flexDirection="flex-row"
    >
      {routes.map((item, index) => {
        if (index === routes.length - 1) {
          return (
            <Container
              font={{
                textTransform: "capitalize",
                color: colorFirst,
                ...fontStyle,
              }}
              key={item.name}
            >
              {item.name}
            </Container>
          );
        }
        return (
          <Container
            align="items-center"
            data-link={item.link}
            display="flex"
            justify="justify-start"
            key={item.name}
            font={fontStyle}
            className="cursor-pointer"
            onClick={handleClickContainer}
          >
            {item.name}
            <Icon
              remixicon="ri-arrow-right-s-line"
              font={{
                color: "#4D4D4D",
              }}
              className="m-[0.5rem]"
            />
          </Container>
        );
      })}
    </Container>
  );
};

export default Breadcrumbs;
