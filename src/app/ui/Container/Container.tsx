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
    transition = false,
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
        font.verticalAlign,
        font.textTransform,
        font.whiteSpace,
        font.indentText,
        font.wordBreak,
        font.weight,
        font.family,
        font.align,
        font.color,
        font.size,
        className,
        display,
        flexDirection,
        flexWrap,
        justify,
        gap,
        position,
        separator.padding,
        separator.margin,
        shadow.color,
        shadow.size,
        size.height,
        size.maxHeight,
        size.minHeight,
        size.maxWidth,
        size.minWidth,
        size.width,
        transition ? "transition-all duration-500" : "",
        rounded
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export default Container;
