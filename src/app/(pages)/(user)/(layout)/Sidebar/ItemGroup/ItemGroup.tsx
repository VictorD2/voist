import { FC } from "react";
import Container from "@/app/ui/Container";
import Item from "./Item/Item";
import { ItemGroupProps } from "./ItemGroup.type";
import { classNames } from "@/app/shared/utils/helpers";
import { useGlobalContext } from "@/app/shared/contexts/GlobalProvider";

const ItemGroup: FC<ItemGroupProps> = (props) => {
  const { expand, items, separator, setExpand } = props;
  const {
    user: {
      user: { role },
    },
  } = useGlobalContext();
  return (
    <Container
      size={{ width: "w-full" }}
      font={{
        textTransform: "uppercase",
        size: "text-[11px]",
      }}
      separator={{
        padding: !expand
          ? "lg:p-0 pb-4 pl-4 group-hover:pl-4 group-hover:pb-4"
          : "pl-5 pb-4",
      }}
    >
      <Container
        font={{ color: "text-black", weight: "font-medium" }}
        separator={{ margin: "mb-2" }}
        className={classNames(
          !expand
            ? "block lg:hidden group-hover:block lg:mb-0 group-hover:mb-2"
            : "block",
          "opacity-[0.6]"
        )}
      >
        {separator}
      </Container>
      {items.map(({ slug, link, remixicon, children, code }) => {
        if (role?.permissions.includes(code + ""))
          return (
            <Item
              first
              code={code}
              textColor="text-black"
              expand={expand}
              setExpand={setExpand}
              key={slug}
              slug={slug}
              remixicon={remixicon}
              link={link}
              sons={children}
            />
          );
      })}
    </Container>
  );
};

export default ItemGroup;
