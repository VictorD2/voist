"use client";
import { classNames, mergeObjects } from "../../shared/utils/helpers";
import { ButtonProps } from "./Button.type";
import styles from "./Button.module.css";
import Container from "../Container";
import Icon from "../Icon";
import {
  defaultBorder,
  defaultFont,
  defaultSeparator,
  defaultShadow,
  defaultSize,
} from "./Button.default";

const Button: React.FC<ButtonProps> = (props) => {
  const {
    animateLoading = "animate-spin",
    justify = "justify-center",
    bgColor = "bg-primary",
    rounded = "rounded-md",
    align = "items-center",
    display = "flex",
    flexDirection = "flex-row",
    border = {},
    type = "button",
    className = "",
    ripples = true,
    flexWrap = "flex-nowrap",
    toggle = false,
    size = {},
    separator = {},
    font = {},
    shadow = {},
    textLoading,
    gap = "gap-1",
    remixicon,
    trailRemixicon,
    responsible = false,
    disabled,
    transition = false,
    loading,
    onClick,
    text,
    ...rest
  } = props;

  const separatorStyle = mergeObjects(defaultSeparator, separator);
  const borderStyle = mergeObjects(defaultBorder, border);
  const shadowStyle = mergeObjects(defaultShadow, shadow);
  const fontStyle = mergeObjects(defaultFont, font);
  const sizeStyle = mergeObjects(defaultSize, size);

  const handleClickEvent = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Ripples
    if (ripples) {
      const button = e.currentTarget;
      const circle = document.createElement("span");
      const diameter = Math.max(button.clientWidth, button.clientHeight);
      const radius = diameter / 2;
      const buttonRect = button.getBoundingClientRect();
      circle.style.width = circle.style.height = `${radius / 2}px`;
      circle.style.left = `${e.clientX - buttonRect.left - radius / 4}px`;
      circle.style.top = `${e.clientY - buttonRect.top - radius / 4}px`;
      circle.classList.add(styles.ripple);
      for (let i = 0; i < button.children.length; i++) {
        const element = button.children[i];
        if (element.className.includes("ripple")) element.remove();
      }
      button.appendChild(circle);
      circle.addEventListener("animationend", () => {
        circle.remove();
      });
    }

    if (onClick) onClick(e);
  };

  return (
    <button
      className={classNames(
        "transition-all duration-500 relative overflow-hidden",
        disabled ? "bg-opacity-80 text-opacity-80 cursor-not-allowed" : "",
        toggle ? "shadow-inner shadow-secondary" : "",
        transition ? "transition-all duration-500" : "",
        bgColor,
        display,
        align,
        flexDirection,
        flexWrap,
        gap,
        borderStyle.size,
        borderStyle.color,
        fontStyle.color,
        fontStyle.size,
        sizeStyle.height,
        sizeStyle.width,
        shadowStyle.color,
        shadowStyle.size,
        className,
        sizeStyle.minWidth,
        separatorStyle.padding,
        justify,
        rounded
      )}
      disabled={disabled || loading}
      onClick={handleClickEvent}
      type={type}
      {...rest}
    >
      {!loading && (
        <>
          {remixicon && <Icon font={fontStyle} remixicon={remixicon} />}
          {text && (
            <Container
              font={fontStyle}
              display={classNames(!responsible ? "" : "lg:flex md:flex hidden")}
              as="span"
            >
              {text}
            </Container>
          )}
          {trailRemixicon && (
            <Icon font={fontStyle} remixicon={trailRemixicon} />
          )}
        </>
      )}

      {loading && (
        <>
          {textLoading && (
            <Container
              display={classNames(!responsible ? "" : "lg:flex md:flex hidden")}
              as="span"
              font={fontStyle}
            >
              {textLoading}
            </Container>
          )}
          {animateLoading === "animate-spin" && (
            <Icon
              remixicon="ri-loader-4-fill"
              className="animate-spin"
              font={fontStyle}
            />
          )}
          {animateLoading === "animate-pulse" && (
            <Icon
              remixicon="ri-checkbox-blank-circle-fill"
              className="animate-pulse"
              font={fontStyle}
            />
          )}
        </>
      )}
    </button>
  );
};

export default Button;
