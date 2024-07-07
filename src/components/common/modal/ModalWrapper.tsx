import If from "../utils/If";
import Portal from "../utils/Portal";
import { FC } from "react";

export interface ModalProps {
  children: JSX.Element;
  isOpen: boolean;
  toggle: () => void;
}

const Modal: FC<ModalProps> = ({ children, isOpen, toggle }) => {
  const root = document.getElementById("root");

  return (
    <If condition={isOpen}>
      <Portal container={root}>
        <div className="modal-wrapper" onClick={toggle}>
          {children}
        </div>
      </Portal>
    </If>
  );
};

export default Modal;
