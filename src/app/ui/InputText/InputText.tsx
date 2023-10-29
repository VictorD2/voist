"use client";
import { FC, useState } from "react";
//** Types */
import { InputTextProps } from "./InputText.type";
//** Ui */
import Container from "../Container";
import Label from "../Label";
import Text from "../Text";
import Icon from "../Icon";
//** Default Styles */
import {
  defaultLabel,
  defaultHelpText,
  defaultBorder,
  defaultShadow,
  defaultSize,
  defaultSeparator,
  defaultFont,
} from "./InputText.default";
import { classNames, mergeObjects } from "@/app/shared/utils/helpers";

const InputText: FC<InputTextProps> = (props) => {
  const {
    bgColor = "bg-white",
    border = {},
    className,
    name,
    id = name,
    label = {},
    helpText = {},
    orientation = "vertical",
    remixicon,
    responsiveIcon,
    eventResponsiveIcon,
    floatIcon,
    eventFloatIcon,
    disabled,
    required,
    rounded = "rounded",
    shadow = {},
    font = {},
    size = {},
    type = "text",
    separator = {},
    ...rest
  } = props;

  const [isPassword, setIsPassword] = useState<boolean>(type === "password");

  const handleEventResponsiveIcon = () => {
    if (eventResponsiveIcon) eventResponsiveIcon();
  };

  const handleEventFloatIcon = () => {
    if (eventFloatIcon) eventFloatIcon();
  };

  const isHorizontal = orientation === "horizontal";
  const borderStyle = mergeObjects(defaultBorder, border);
  const helpTextStyle = mergeObjects(defaultHelpText, helpText);
  const labelStyle = mergeObjects(defaultLabel, label);
  const shadowStyle = mergeObjects(defaultShadow, shadow);
  const sizeStyle = mergeObjects(defaultSize, size);
  const separatorStyle = mergeObjects(defaultSeparator, separator);
  const fontStyle = mergeObjects(defaultFont, font);

  return (
    <Container
      size={sizeStyle}
      align="items-start"
      display="flex flex-nowrap"
      flexDirection={isHorizontal ? "flex-row" : "flex-col"}
      justify="justify-start"
    >
      {/* Label Section */}
      {labelStyle?.text?.length !== 0 && (
        <Container
          font={labelStyle.font}
          display="flex"
          flexDirection="flex-row"
          gap="gap-1"
          separator={{ margin: "my-1" }}
        >
          {/* Label */}
          <Label
            htmlFor={id}
            className={classNames(labelStyle.className)}
            font={labelStyle.font}
            size={{
              width: isHorizontal ? labelStyle.size?.width : "",
              ...labelStyle.size,
            }}
            text={labelStyle.text}
          >
            {/* IsRquired */}
            {required && (
              <Container
                as="span"
                separator={{ padding: "pl-1" }}
                display="inline"
                font={{ color: "text-red-600" }}
              >
                *
              </Container>
            )}
          </Label>
        </Container>
      )}

      {/* Input Container */}
      <Container
        display="flex"
        flexDirection="flex-col"
        size={{ width: "w-full" }}
      >
        {/* Input Section */}
        <Container
          display="flex"
          flexDirection="flex-row"
          flexWrap="flex-nowrap"
          rounded={rounded}
          border={{
            style: borderStyle.style,
            size: borderStyle.size,
            color:
              helpTextStyle.text?.length !== 0
                ? "border-red-600"
                : borderStyle.color,
          }}
          shadow={{
            color:
              helpTextStyle.text?.length !== 0
                ? "shadow-red-600"
                : shadowStyle.color,
            size:
              helpTextStyle.text?.length !== 0 ? "shadow" : shadowStyle.size,
          }}
          className={classNames(borderStyle.focusColor, borderStyle.hoverColor)}
        >
          {/* Input Container */}
          <Container
            display="flex"
            position="relative"
            size={{ width: "w-full" }}
            align="items-center"
          >
            {/* Input Text */}
            <input
              className={classNames(
                className,
                fontStyle.color,
                separatorStyle.margin,
                separatorStyle.padding,
                disabled ? "bg-gray-300" : bgColor,
                "focus:outline-none appearance-none w-full",
                remixicon ? "rounded-l-md" : rounded,
                borderStyle.focusColor,
                borderStyle.color,
                borderStyle.size
              )}
              name={id}
              id={id}
              required={required}
              disabled={disabled}
              type={isPassword ? "password" : "text"}
              {...rest}
            />

            {/* Responsive Icon */}
            {type !== "password" && (
              <>
                {responsiveIcon && (
                  <Icon
                    font={fontStyle}
                    remixicon={responsiveIcon ? responsiveIcon : ""}
                    onClick={handleEventResponsiveIcon}
                    className="w-1 absolute lg:hidden md:hidden my-auto top-[6px] right-6 cursor-pointer"
                  />
                )}
                {floatIcon && (
                  <Icon
                    font={fontStyle}
                    remixicon={floatIcon ? floatIcon : ""}
                    onClick={handleEventFloatIcon}
                    className="w-1 absolute my-auto top-[6px] right-6 cursor-pointer"
                  />
                )}
              </>
            )}

            {/* Responsive Icon */}
            {type === "password" && (
              <Icon
                remixicon={isPassword ? "ri-eye-line" : "ri-eye-off-line"}
                onClick={() => {
                  setIsPassword((pass) => !pass);
                }}
                font={fontStyle}
                className="w-1 absolute my-auto top-[5px] right-6"
              />
            )}
          </Container>

          {/* Box Icon */}
          {remixicon && (
            <Container
              align="items-center"
              bgColor="bg-gray-300"
              display="flex"
              justify="justify-center"
              rounded="rounded-r-md"
              size={{ width: "w-10" }}
            >
              <Icon remixicon={remixicon} />
            </Container>
          )}
        </Container>

        {/* HelpText Section */}
        {helpTextStyle.text?.length !== 0 && (
          <Text
            className={classNames(helpTextStyle.className, "caption")}
            separator={helpTextStyle.separator}
            text={helpTextStyle.text}
            font={helpTextStyle.font}
            size={helpTextStyle.size}
          />
        )}
      </Container>
    </Container>
  );
};

export default InputText;
