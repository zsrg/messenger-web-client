import clsx from "clsx";
import { FC } from "react";

export interface ButtonProps {
  children: string;
  disabled?: boolean;
  title?: string;
  className?: string;
  onClick?: () => void;
}

const Button: FC<ButtonProps> = ({
  children,
  disabled,
  title,
  className,
  onClick,
}) => (
  <button
    className={clsx("button", className)}
    disabled={disabled}
    title={title}
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;
