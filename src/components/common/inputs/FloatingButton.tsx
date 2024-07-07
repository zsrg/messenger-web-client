import clsx from "clsx";
import { FC } from "react";

export interface FloatingButtonProps {
  children: JSX.Element;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}

const FloatingButton: FC<FloatingButtonProps> = ({
  children,
  disabled,
  className,
  onClick,
}) => (
  <button
    className={clsx("icon-button", "floating-button", className)}
    disabled={disabled}
    onClick={onClick}
  >
    {children}
  </button>
);

export default FloatingButton;
