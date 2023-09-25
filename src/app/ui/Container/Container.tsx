import { classNames } from "@/app/shared/utils/helpers";
import { ContainerProps } from "./Container.type";

const Container: React.FC<ContainerProps> = (props) => {
  const {
    align = "",
    as: Tag = "div",
    bgColor = "",
    children,
    className = "",
    display = "",
    flexDirection = "",
    justify = "",
    flexWrap = "",
    gap = "",
    position = "",
    rounded = "",
    font = {},
    border = {},
    shadow = {},
    separator = {},
    size = {},
    ...rest
  } = props;

  return (
    <Tag
      className={classNames(
        align,
        bgColor,
        border.color,
        border.size,
        border.style,
        font.align,
        font.color,
        font.size,
        font.weight,
        font.verticalAlign,
        font.textTransform,
        font.whiteSpace,
        font.wordBreak,
        font.indentText,
        font.family,
        className,
        display,
        flexDirection,
        flexWrap,
        justify,
        gap,
        position,
        separator.margin,
        separator.padding,
        shadow.color,
        shadow.size,
        size.height,
        size.minHeight,
        size.width,
        size.minWidth,
        rounded
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export default Container;
