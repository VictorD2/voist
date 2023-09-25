import { classNames, mergeObjects } from "../../shared/utils/helpers";
import Container from "../Container";
import { defaultFont, defaultSize } from "./Icon.default";
import { IconProps } from "./Icon.type";

const Icon: React.FC<IconProps> = (props) => {
  const { className = "", remixicon, font = {}, size = {}, ...rest } = props;

  const fontStyle = mergeObjects(defaultFont, font);
  const sizeStyle = mergeObjects(defaultSize, size);

  return (
    <Container
      as="i"
      className={classNames(remixicon, className, "align-middle")}
      font={fontStyle}
      size={sizeStyle}
      {...rest}
    />
  );
};

export default Icon;
