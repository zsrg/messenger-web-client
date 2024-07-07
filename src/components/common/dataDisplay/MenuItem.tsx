import clsx from "clsx";
import If from "../utils/If";
import { FC } from "react";

export interface MenuItemProps {
  primaryElement?: JSX.Element;
  children?: string;
  text?: string;
  secondaryText?: string;
  disableHover?: boolean;
  secondaryElement?: JSX.Element;
  className?: string;
  onClick?: () => void;
}

const MenuItem: FC<MenuItemProps> = ({
  primaryElement,
  children,
  text,
  secondaryText,
  secondaryElement,
  onClick,
  disableHover,
  className,
}) => (
  <div
    className={clsx("list-item", "menu-item", { "disable-hover": disableHover }, className)}
    onClick={onClick}
  >
    <If condition={primaryElement}>
      <div className="menu-item__primary">{primaryElement}</div>
    </If>

    <div className="menu-item__text">
      <span>{children || text}</span>
      <If condition={secondaryText}>
        <span>{secondaryText}</span>
      </If>
    </div>

    <If condition={secondaryElement}>
      <div className="menu-item__secondary">{secondaryElement}</div>
    </If>
  </div>
);

export default MenuItem;
