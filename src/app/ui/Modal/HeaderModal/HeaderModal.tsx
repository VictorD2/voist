import { classNames, mergeObjects } from "../../../shared/utils/helpers";
import Container from "../../Container";
import Icon from "../../Icon";
import { defaultFont, defaultSeparator, defaultSize } from "./Header.default";
import { HeaderModalProps } from "./HeaderModal.type";

const HeaderModal: React.FC<HeaderModalProps> = (props) => {
  const {
    bgColor = "bg-primary",
    remixicon,
    text,
    xIcon = false,
    onClose,
    separator = {},
    font = {},
    size = {},
  } = props;

  const sizeStyle = mergeObjects(defaultSize, size);
  const separatorStyle = mergeObjects(defaultSeparator, separator);
  const fontStyle = mergeObjects(defaultFont, font);

  return (
    <Container
      bgColor={bgColor}
      font={fontStyle}
      size={sizeStyle}
      separator={separatorStyle}
      display="flex flex-nowrap"
      flexDirection="flex-row"
      align="items-center"
      justify="justify-between"
    >
      <Container
        gap="gap-2"
        display="flex"
        align="items-center"
        className="uppercase"
      >
        {remixicon && (
          <Icon font={fontStyle} remixicon={remixicon} className="w-5" />
        )}
        <span>{text}</span>
      </Container>
      {xIcon && (
        <Container>
          <button
            type="button"
            className={`${
              text
                ? classNames("bg-transparent", fontStyle.color)
                : classNames(
                    "focus:outline-none",
                    "text-gray-400",
                    "hover:text-gray-500",
                    "rounded-md"
                  )
            } flex items-center justify-center`}
            onClick={(e) => onClose(e)}
          >
            <Icon
              remixicon="ri-close-line"
              font={{ size: "text-2xl", color: fontStyle.color }}
              className={bgColor}
              aria-hidden="true"
            />
          </button>
        </Container>
      )}
    </Container>
  );
};

export default HeaderModal;
