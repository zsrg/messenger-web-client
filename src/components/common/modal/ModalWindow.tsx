import clsx from "clsx";
import { FC, MouseEvent } from "react";

export interface ModalWinsowProps {
  children: JSX.Element | JSX.Element[];
  fixed?: boolean;
}

const ModalWindow: FC<ModalWinsowProps> = ({ children, fixed }) => (
  <div
    className={clsx("modal-window", { "modal-window-fixed": fixed })}
    onClick={(e: MouseEvent) => e.stopPropagation()}
  >
    {children}
  </div>
);

export default ModalWindow;
