import { FC } from "react";
import { LabelProps } from "./Label.type";
import { classNames, mergeObjects } from "@/app/shared/utils/helpers";
import { defaultFont, defaultSeparator, defaultSize } from "./Label.default";

const Label: FC<LabelProps> = (props) => {
  const {
    className = "",
    children,
    text = "",
    font = {},
    size = {},
    separator = {},
    ...rest
  } = props;

  const fontStyle = mergeObjects(defaultFont, font);
  const sizeStyle = mergeObjects(defaultSize, size);
  const separatorStyle = mergeObjects(defaultSeparator, separator);

  return (
    <label
      {...rest}
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
        separatorStyle.margin,
        separatorStyle.padding
      )}
    >
      {text}
      {children}
    </label>
  );
};

export default Label;
