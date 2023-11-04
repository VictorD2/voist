import { ComboBoxProps } from "./ComboBox.type";
import Select from "react-select";
import Container from "../Container/Container";
import { classNames, mergeObjects } from "@/app/shared/utils/helpers";
import {
  defaultBorder,
  defaultFont,
  defaultHelpText,
  defaultLabel,
  defaultSeparator,
  defaultShadow,
  defaultSize,
} from "./ComboBox.default";
import Label from "../Label";

const ComboBox = <T extends {}>(props: ComboBoxProps<T>) => {
  const {
    onChange,
    classNameCaption = "",
    labelField,
    valueField,
    onFocus,
    name,
    id = name,
    value,
    items,
    className = "",
    required = false,
    placeholder = "Select an item",
    border = {},
    helpText = {},
    label = {},
    shadow = {},
    size = {},
    orientation = "vertical",
    separator = {},
    font = {},
    ...rest
  } = props;

  const isHorizontal = orientation === "horizontal";
  const borderStyle = mergeObjects(defaultBorder, border);
  const helpTextStyle = mergeObjects(defaultHelpText, helpText);
  const labelStyle = mergeObjects(defaultLabel, label);
  const shadowStyle = mergeObjects(defaultShadow, shadow);
  const sizeStyle = mergeObjects(defaultSize, size);
  const separatorStyle = mergeObjects(defaultSeparator, separator);
  const fontStyle = mergeObjects(defaultFont, font);

  const getValues = () => {
    const values = [];
    for (let i = 0; i < items.length; i += 1) {
      const element = items[i];
      values.push({
        label: element[labelField],
        value: element[valueField],
        ...element,
      });
    }
    return values;
  };

  const getValue = () => {
    return {
      label: value[labelField],
      value: value[valueField],
      ...value,
    };
  };

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
        <Select
          isSearchable={false}
          name={name}
          id={id}
          minMenuHeight={180}
          styles={{
            option: (provided: any, state: any) => ({
              ...provided,
              color: state.isSelected ? "#fff" : "#000",
              backgroundColor: state.isSelected ? "#5271FF" : "#fff",
            }),
            valueContainer: (provided: any, state: any) => ({
              ...provided,
              height: "30px",
              padding: "0 6px",
            }),
            indicatorsContainer: (provided: any, state: any) => ({
              ...provided,
              height: "30px",
            }),
            // "#ef4444"
            control: (base: any) => ({
              ...base,
              height: "35px",
              minHeight: "35px",
              backgroundColor: "#eaf3f147",
              border: "",
              borderWidth: "1px",
              "&:hover": {
                borderColor: `${
                  helpTextStyle.text?.length !== 0 ? "#ef4444" : "#5271FF"
                }`,
                borderWidth: "1px",
              },
              "&:focus": {
                borderColor: "#5271FF",
              },
              "&:active": {
                borderColor: "#5271FF",
              },
            }),
            dropdownIndicator: (base: any) => ({
              ...base,
              color: "#33435A",
              "&:hover": {
                boxShadow: "none",
                color: "#5271FF",
              },
              "&:focus": {
                boxShadow: "none",
                color: "#5271FF",
              },
              "&:active": {
                boxShadow: "none",
                color: "#5271FF",
              },
            }),
          }}
          maxMenuHeight={180}
          className={classNames(
            className,
            fontStyle.color,
            separatorStyle.margin,
            separatorStyle.padding,
            "focus:outline-none appearance-none w-full",
            borderStyle.focusColor,
            borderStyle.color,
            borderStyle.size
          )}
          onChange={onChange}
          placeholder={placeholder}
          tabIndex={200}
          onFocus={(e: any) => {
            if (onFocus) onFocus(e);
          }}
          value={getValue()}
          options={getValues()}
          {...rest}
        />
        {helpTextStyle.text?.length !== 0 && (
          <Container
            font={helpTextStyle.font}
            className={classNames("caption mt-1", `h-2`, `${classNameCaption}`)}
          >
            {helpText.text}
          </Container>
        )}
      </Container>
    </Container>
  );
};

export default ComboBox;
