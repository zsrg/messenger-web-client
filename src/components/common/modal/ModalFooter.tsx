import { FC } from "react";

export interface ModalFooterProps {
  children: JSX.Element | JSX.Element[];
}

const ModalFooter: FC<ModalFooterProps> = ({ children }) => (
  <div className="modal-footer">{children}</div>
);

export default ModalFooter;
