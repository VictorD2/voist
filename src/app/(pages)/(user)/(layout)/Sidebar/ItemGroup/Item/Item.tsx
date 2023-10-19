import { Disclosure, Transition } from "@headlessui/react";
import { FC, useEffect, useRef } from "react";
import { ItemProps } from "./item.type";
import styles from "./Item.module.css";
import { useRouter, usePathname } from "next/navigation";
import Container from "@/app/ui/Container";
import { classNames } from "@/app/shared/utils/helpers";
import Icon from "@/app/ui/Icon";

const Item: FC<ItemProps> = (props) => {
  const {
    textHover = "hover:text-white",
    textColor = "text-secondary",
    colorActive = "text-white",
    bgActive = "bg-primary",
    gapTextIcon = "gap-3",
    iconSize = "text-xl",
    remixicon = "",
    marginLeft = 0,
    expand = true,
    first = false,
    setExpand,
    sons = [],
    onClick,
    slug,
    link,
  } = props;

  const pathname = usePathname();
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Ripples
    if (link !== "#") {
      const div = e.currentTarget;
      const circle = document.createElement("span");
      const diameter = Math.max(div.clientWidth, div.clientHeight);
      const radius = diameter / 2;
      const divRect = div.getBoundingClientRect();
      circle.style.width = circle.style.height = `${radius / 2}px`;
      circle.style.left = `${e.clientX - divRect.left - radius / 4}px`;
      circle.style.top = `${e.clientY - divRect.top - radius / 4}px`;
      circle.classList.add(styles.ripple);
      for (let i = 0; i < div.children.length; i++) {
        const element = div.children[i];
        if (element.className.includes("ripple")) element.remove();
      }
      div.appendChild(circle);
      circle.addEventListener("animationend", () => circle.remove());
      router.push(link);
      if (setExpand) setExpand(true);
    }

    if (onClick) onClick(e);
  };

  const panel = useRef<HTMLElement>(null);

  useEffect(() => {
    return () => {
      panel.current?.classList.toggle("block");
      panel.current?.classList.toggle("lg:hidden");
      // eslint-disable-next-line react-hooks/exhaustive-deps
      panel.current?.classList.toggle("group-hover:block");
    };
  }, [expand]);

  // DropDown
  if (sons.length > 0) {
    return (
      <Container
        className="ease-in duration-300 overflow-hidden group"
        onClick={handleClick}
        separator={{
          padding: classNames(
            expand ? "pl-1" : "lg:pl-4 pl-1 group-hover:pl-1",
            first ? "py-0" : "py-0"
          ),
        }}
        position="relative"
        font={{
          color: classNames(textColor, textHover),
        }}
        size={{
          width: "w-full",
        }}
      >
        <Disclosure
          defaultOpen={sons.some((item) => pathname.includes(item.link))}
        >
          {({ open }) => (
            <>
              <Disclosure.Button
                as="div"
                style={{ marginLeft: `${marginLeft}px` }}
                className={classNames(
                  "items-center justify-between flex w-full pr-2 py-1 gap-3 cursor-pointer",
                  expand ? "pl-1" : "lg:pl-4 pl-1 group-hover:pl-1",
                  sons.some((item) => pathname.includes(item.link)) || open
                    ? "border-r-4 border-r-white"
                    : ""
                )}
              >
                {/* Remixicon */}
                <div className={classNames("flex flex-row", gapTextIcon)}>
                  <div className="flex-shrink-0 h-5 w-6 flex items-center">
                    <Icon
                      remixicon={remixicon}
                      font={{
                        size: iconSize,
                        color: classNames(
                          sons.some((item) => pathname.includes(item.link)) ||
                            open
                            ? "text-white"
                            : ""
                        ),
                      }}
                    />
                  </div>

                  {/* Text */}
                  <span
                    className={classNames(
                      "capitalize text-sm",
                      expand ? "block" : "lg:hidden group-hover:block",
                      sons.some((item) => pathname.includes(item.link)) || open
                        ? "text-white font-semibold"
                        : ""
                    )}
                  >
                    {slug}
                  </span>
                </div>

                <Icon
                  remixicon="ri-arrow-up-s-line"
                  font={{
                    size: "text-xl",
                    color: open ? "rotate-0 transform text-white" : "rotate-90",
                  }}
                  className={expand ? "block" : "lg:hidden group-hover:block"}
                />
              </Disclosure.Button>
              <Transition
                ref={panel}
                className={classNames("overflow-hidden block")}
                enter="transition transition-[max-height] duration-700 ease-in"
                enterFrom="transform max-h-0"
                enterTo="transform max-h-screen"
                leave="transition transition-[max-height] duration-700 ease-out"
                leaveFrom="transform max-h-screen"
                leaveTo="transform max-h-0"
              >
                <Disclosure.Panel>
                  {sons.map((item) => {
                    return (
                      <Item
                        marginLeft={marginLeft + 17}
                        remixicon={item.remixicon}
                        colorActive={colorActive}
                        setExpand={setExpand}
                        iconSize="text-[8px]"
                        textColor={textColor}
                        textHover={textHover}
                        sons={item.children}
                        gapTextIcon="gap-1"
                        bgActive={bgActive}
                        onClick={onClick}
                        code={item.code}
                        link={item.link}
                        slug={item.slug}
                        key={item.slug}
                        expand={expand}
                      />
                    );
                  })}
                </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>
      </Container>
    );
  }

  // Item
  return (
    <Container
      bgColor={pathname.includes(link) ? "bg-primary" : "hover:bg-primary"}
      rounded="rounded-2xl"
      separator={{
        padding: classNames(
          expand ? "pl-1 py-1" : "lg:pl-4 pl-1 py-1 group-hover:pl-1"
        ),
      }}
      position="relative"
      font={{
        color: classNames(textColor, textHover),
      }}
      size={{
        width: "w-full",
      }}
      onClick={handleClick}
      className="ease-in duration-300 overflow-hidden group group/item"
    >
      <Container
        separator={{
          padding: classNames(
            expand
              ? "pl-1 pr-2 py-1"
              : "lg:pl-4 pl-1 pr-2 py-1 group-hover:pl-1"
          ),
        }}
        align="items-center"
        display="flex"
        size={{
          width: "w-full",
        }}
        rounded="rounded-md"
        style={{ marginLeft: `${marginLeft}px` }}
        font={{
          color: pathname.includes(link) ? colorActive : "",
        }}
        className={classNames(gapTextIcon, "cursor-pointer")}
      >
        {/* Icon */}
        <Container display="flex" align="items-center">
          <Icon
            font={{
              size: iconSize,
              color: classNames(
                pathname.includes(link)
                  ? colorActive
                  : `${textColor} group-hover/item:text-white`
              ),
            }}
            remixicon={remixicon}
          />
        </Container>

        {/* Text */}
        <Container
          className={classNames(
            "capitalize text-sm",
            expand ? "block" : "lg:hidden group-hover:block",
            sons.some((item) => pathname.includes(item.link))
              ? "text-white font-semibold"
              : ""
          )}
          as="span"
          font={{
            size: "text-[13px] capitalize",
          }}
        >
          {slug}
        </Container>
      </Container>
    </Container>
  );
};

export default Item;
