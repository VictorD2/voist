import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ModalProps } from "./Modal.type";
import Container from "../Container";
import { classNames } from "../../shared/utils/helpers";

const Modal: React.FC<ModalProps> = (props) => {
  const {
    open,
    header = <></>,
    onClose,
    children,
    width,
    overflowClosed,
    bgColor = "bg-white",
    overlayBgColor = "bg-secondary",
    rounded = "rounded-lg",
  } = props;
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-50 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={overflowClosed ? (e) => onClose(e) : () => {}}
      >
        <Container
          display="flex sm:block"
          align="items-center"
          justify="justify-center"
          size={{
            minHeight: "min-h-screen",
          }}
          separator={{
            padding: "pt-4 px-4 pb-20 sm:p-0",
          }}
          font={{
            align: "text-center",
          }}
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
            <Dialog.Overlay
              className={classNames(
                "fixed inset-0 bg-opacity-75 transition-opacity",
                overlayBgColor
              )}
            />
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
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              className={classNames(
                header ? "p-0" : "p-4 md:p-6",
                width,
                "overflow-hidden transform transition-all inline-block text-left align-middle shadow-xl sm:my-8",
                bgColor,
                rounded
              )}
            >
              {header}
              {children}
            </div>
          </Transition.Child>
        </Container>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;
