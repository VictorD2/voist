import { FC, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import Container from "../Container";
import { DropdownMenuProps } from "./DropdownMenu.type";
import { classNames, mergeObjects } from "@/app/shared/utils/helpers";
import { defaultSeparator, defaultSize } from "./Dropdown.default";

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

  const sizeStyle = mergeObjects(defaultSize, size);
  const separatorStyle = mergeObjects(defaultSeparator, separator);

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button>
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
        enter={classNames("transition ease-out duration-100", bgColor)}
        enterFrom={classNames("transform opacity-0 scale-95", bgColor)}
        enterTo={classNames("transform opacity-100 scale-100", bgColor)}
        leave={classNames("transition ease-in duration-75", bgColor)}
        leaveFrom={classNames("transform opacity-100 scale-100", bgColor)}
        leaveTo={classNames("transform opacity-0 scale-95", bgColor)}
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
