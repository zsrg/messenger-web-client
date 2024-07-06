import clsx from "clsx";
import { FC } from "react";

export interface IconButtonProps {
  children: JSX.Element;
  active?: boolean;
  disabled?: boolean;
  title?: string;
  className?: string;
  onClick?: () => void;
}

const IconButton: FC<IconButtonProps> = ({
  children,
  active,
  disabled,
  title,
  className,
  onClick,
}) => (
  <button
    className={clsx("icon-button", { active }, className)}
    disabled={disabled}
    title={title}
    onClick={onClick}
  >
    {children}
  </button>
);

export default IconButton;
