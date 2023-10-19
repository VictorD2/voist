import { Menu, Transition } from "@headlessui/react";
import { FC, Fragment } from "react";
import { classNames, mergeObjects } from "@/app/shared/utils/helpers";
import { defaultSeparator, defaultSize } from "./Dropdown.default";
import { DropdownMenuProps } from "./DropdownMenu.type";
import Container from "../Container";

const DropdownMenu: FC<DropdownMenuProps> = (props) => {
  const {
    children,
    buttonNode,
    positionAbs = "",
    bgColor,
    size = {},
    separator = {},
    show,
  } = props;

  const separatorStyle = mergeObjects(defaultSeparator, separator);
  const sizeStyle = mergeObjects(defaultSize, size);

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button as="div">
        <Container
          display="flex"
          flexDirection="flex-row"
          justify="justify-between"
          align="items-center"
        >
          {buttonNode}
        </Container>
      </Menu.Button>
      <Transition
        show={show}
        as={Fragment}
        leaveFrom={classNames("transform opacity-100 scale-100", bgColor)}
        enterTo={classNames("transform opacity-100 scale-100", bgColor)}
        enterFrom={classNames("transform opacity-0 scale-95", bgColor)}
        enter={classNames("transition ease-out duration-100", bgColor)}
        leaveTo={classNames("transform opacity-0 scale-95", bgColor)}
        leave={classNames("transition ease-in duration-75", bgColor)}
      >
        <Menu.Items
          className={classNames(
            bgColor,
            positionAbs,
            "absolute rounded-md focus:outline-none z-50",
            sizeStyle.width,
            sizeStyle.height,
            separatorStyle.margin,
            separatorStyle.padding
          )}
        >
          <Container bgColor={bgColor} separator={{ padding: "px-1 py-1" }}>
            {children}
          </Container>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default DropdownMenu;
