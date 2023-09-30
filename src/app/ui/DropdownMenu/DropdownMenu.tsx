import { FC, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import Container from "../Container";
import { DropdownMenuProps } from "./DropdownMenu.type";
import { classNames, mergeObjects } from "@/app/shared/utils/helpers";
import { defaultSize } from "./Dropdown.default";

const DropdownMenu: FC<DropdownMenuProps> = (props) => {
  const { children, buttonNode, bgColor = "bg-white", size = {} } = props;

  const sizeStyle = mergeObjects(defaultSize, size);

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
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className={classNames(
            bgColor,
            "absolute right-0 mt-2 rounded-md focus:outline-none z-50",
            sizeStyle.width,
            sizeStyle.height
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
