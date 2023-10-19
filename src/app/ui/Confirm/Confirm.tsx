import { Dialog, Transition } from "@headlessui/react";
import { FC, Fragment } from "react";
import { ConfirmProps } from "./Confirm.type";
import Container from "../Container";
import Button from "../Button";
import Icon from "../Icon";

const Confirm: FC<ConfirmProps> = (props) => {
  const {
    title = "Remove",
    buttonText = "Remove",
    type = "danger",
    message,
    onConfirm,
    open,
    setOpen,
  } = props;

  let styleColorButton = {
    warning: "bg-yellow-600 hover:bg-yellow-700",
    success: "bg-green-600 hover:bg-green-700",
    danger: "bg-red-600 hover:bg-red-700",
    primary: "bg-primary",
  };

  let styleColorBg = {
    warning: "bg-yellow-100",
    success: "bg-green-100",
    danger: "bg-red-100",
    primary: "bg-primary",
  };

  let iconType = {
    danger: (
      <Icon
        remixicon="ri-error-warning-line"
        font={{ size: "text-2xl", color: "text-red-600" }}
      />
    ),
    success: (
      <Icon
        remixicon="ri-checkbox-circle-line"
        font={{ size: "text-2xl", color: "text-green-600" }}
      />
    ),
    warning: (
      <Icon
        remixicon="ri-question-line"
        font={{ size: "text-2xl", color: "text-yellow-600" }}
      />
    ),
    primary: (
      <Icon
        remixicon=""
        font={{ size: "text-2xl", color: "text-primary" }}
      />
    ),
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-50 inset-0 overflow-y-auto"
        onClose={setOpen}
      >
        <Container
          display="flex sm:block"
          justify="justify-center"
          align="items-end"
          font={{ align: "text-center" }}
          size={{ minHeight: "min-h-screen" }}
          separator={{ padding: "pt-4 px-4 pb-20 sm:p-0" }}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-secondary bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            enter="ease-out duration-300"
            leave="ease-in duration-200"
          >
            <div className="inline-block px-10 py-5 align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <Container
                bgColor="bg-white"
                separator={{ padding: "px-4 pt-5 pb-4 sm:p-6 sm:pb-4" }}
              >
                <Container display="sm:flex" align="sm:items-start">
                  {/* <Container
                    display="flex"
                    align="items-center"
                    justify="justify-center"
                    separator={{
                      margin: "mx-auto sm:mx-0",
                    }}
                    size={{
                      width: "w-12 sm:w-10",
                      height: "h-12 sm:h-10",
                    }}
                    rounded="rounded-full"
                    className={`flex-shrink-0 ${styleColorBg[type]}`}
                  >
                    {iconType[type]}
                  </Container> */}
                  <Container
                    separator={{
                      margin: "mt-3 sm:mt-0 sm:ml-4",
                    }}
                    font={{
                      align: "text-center sm:text-left",
                    }}
                  >
                    <Dialog.Title
                      as="h3"
                      className="text-2xl text-center leading-6 font-medium text-gray-900"
                    >
                      {title}
                    </Dialog.Title>
                    <Container separator={{ margin: "mt-2" }}>
                      <Container
                        as="p"
                        font={{
                          size: "text-sm",
                          color: "text-gray-500",
                        }}
                      >
                        {message}
                      </Container>
                    </Container>
                  </Container>
                </Container>
              </Container>
              <Container
                flexDirection="flex-col lg:flex-row"
                justify="justify-center"
                align="items-center"
                bgColor="bg-gray-50"
                separator={{
                  padding: "px-4 py-3",
                }}
                display="flex"
                gap="gap-4"
              >
                <Button
                  bgColor="bg-white"
                  font={{
                    color: "text-gray-700",
                  }}
                  text="Cancelar"
                  rounded="rounded-md"
                  type="button"
                  size={{ width: "lg:w-1/2 w-full" }}
                  border={{
                    size: "border-2",
                    color: "border-gray-300",
                  }}
                  shadow={{
                    size: "shadow-sm",
                  }}
                  onClick={() => setOpen(false)}
                />
                <Button
                  bgColor={styleColorButton[type]}
                  text={buttonText}
                  font={{ color: "text-white" }}
                  type="button"
                  size={{ width: "lg:w-1/2 w-full" }}
                  shadow={{
                    size: "shadow-sm",
                  }}
                  rounded="rounded-md"
                  border={{
                    size: "border-2",
                    color: "border-gray-300",
                  }}
                  onClick={() => {
                    onConfirm();
                    setOpen(false);
                  }}
                />
              </Container>
            </div>
          </Transition.Child>
        </Container>
      </Dialog>
    </Transition.Root>
  );
};

export default Confirm;
