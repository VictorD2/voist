"use client";
import { classNames, mergeObjects } from "@/app/shared/utils/helpers";
import { TextProps } from "./Text.type";
import { defaultFont, defaultSeparator, defaultSize } from "./Text.default";

const Text: React.FC<TextProps> = (props) => {
  const {
    className = "",
    text = "",
    font = {},
    display = "",
    size = {},
    children,
    separator = {},
    ...rest
  } = props;
  const fontStyle = mergeObjects(defaultFont, font);
  const sizeStyle = mergeObjects(defaultSize, size);
  const separatorStyle = mergeObjects(defaultSeparator, separator);

  return (
    <p
      className={classNames(
        className,
        fontStyle.align,
        fontStyle.color,
        fontStyle.size,
        fontStyle.weight,
        fontStyle.verticalAlign,
        fontStyle.textTransform,
        fontStyle.whiteSpace,
        fontStyle.wordBreak,
        fontStyle.indentText,
        fontStyle.family,
        sizeStyle.height,
        sizeStyle.minHeight,
        sizeStyle.width,
        sizeStyle.minWidth,
        sizeStyle.maxHeight,
        sizeStyle.maxWidth,
        separatorStyle.margin,
        separatorStyle.padding,
        display
      )}
      {...rest}
    >
      {text}
      {children}
    </p>
  );
};

export default Text;
