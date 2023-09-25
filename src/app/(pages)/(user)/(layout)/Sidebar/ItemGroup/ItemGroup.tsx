import { FC } from "react";
import Container from "@/app/ui/Container";
import Item from "./Item/Item";
import { ItemGroupProps } from "./ItemGroup.type";
import { classNames } from "@/app/shared/utils/helpers";

const ItemGroup: FC<ItemGroupProps> = (props) => {
  const { expand, items, separator } = props;
  return (
    <Container
      size={{ width: "w-full" }}
      font={{
        size: "text-[11px]",
      }}
      separator={{
        padding: expand
          ? "pl-5 pb-4"
          : "lg:p-0 pb-4 pl-4 group-hover:pl-4 group-hover:pb-4",
      }}
      className="uppercase"
    >
      <Container
        separator={{ margin: "mb-2" }}
        font={{ color: "text-black", weight: "font-medium" }}
        // textColor="text-[#7b8191]"
        className={classNames(
          expand
            ? "block"
            : "block lg:hidden group-hover:block lg:mb-0 group-hover:mb-2",
          "opacity-[0.6]"
        )}
      >
        {separator}
      </Container>
      {items.map(({ slug, link, remixicon, children, code }) => {
        return (
          <Item
            first
            code={code}
            // textColor="text-[#7b8191]"
            textColor="text-black"
            expand={expand}
            setDrawer={() => {}}
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
