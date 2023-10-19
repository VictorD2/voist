import { classNames, mergeObjects } from "@/app/shared/utils/helpers";
import { defaultFont, defaultSeparator } from "./List.default";
import { ListProps } from "./List.type";
import Container from "../Container";
import Text from "../Text";
import styles from "./List.module.css";
import Icon from "../Icon";

const List = <T extends {}>(props: ListProps<T>) => {
  const {
    bgColor = "bg-white",
    font = {},
    isLoading = false,
    list = [],
    className,
    onSelectItem,
    separator = {},
    values = [],
    size = {},
    gridColumns = "grid-cols-2",
  } = props;

  const styleFont = mergeObjects(defaultFont, font);
  const styleSeparator = mergeObjects(defaultSeparator, separator);

  return (
    <Container className={styles.list}>
      <Container
        display="flex"
        flexDirection="flex-col"
        size={size}
        className={classNames(
          "cursor-pointer overflow-y-auto",
          className,
          styles.listScroll
        )}
        shadow={{
          color: "shadow-gray-500",
          size: "shadow-md",
        }}
        bgColor={bgColor}
      >
        {isLoading && (
          <Container
            size={{ width: "w-full", height: "h-full" }}
            display="flex"
            justify="justify-center"
            align="items-center"
            flexDirection="flex-col"
            gap="gap-2"
          >
            <Container className="animate-spin">
              <Icon
                remixicon="ri-loader-4-line"
                font={{ size: "text-5xl", color: "text-primary" }}
              />
            </Container>
          </Container>
        )}
        {list.length === 0 && !isLoading && (
          <Container
            size={{ width: "w-full", height: "h-full" }}
            display="flex"
            justify="justify-center"
            align="items-center"
            flexDirection="flex-col"
            gap="gap-2"
          >
            <Icon remixicon="ri-inbox-2-line" font={{ size: "text-5xl" }} />
            <Text
              size={{ width: "" }}
              text="Sin resultados"
              font={{ weight: "font-semibold" }}
            />
          </Container>
        )}
        {list.map((item, i) => {
          return (
            <Container
              onClick={() => {
                if (onSelectItem) onSelectItem(item);
              }}
              key={i + "list"}
              gap="gap-10"
              bgColor={bgColor}
              className={`hover:bg-primary group grid ${gridColumns} `}
              transition
              separator={styleSeparator}
            >
              {values.map((value) => {
                return (
                  <Text
                    size={{
                      width: "",
                    }}
                    className={`group-hover:text-white`}
                    font={styleFont}
                    key={String(item[value]) + i}
                    text={String(item[value])}
                  />
                );
              })}
            </Container>
          );
        })}
      </Container>
    </Container>
  );
};

export default List;
