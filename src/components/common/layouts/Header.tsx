import { FC } from "react";

export interface HeaderProps {
  leftItems?: JSX.Element;
  rightItems?: JSX.Element;
}

const Header: FC<HeaderProps> = ({ leftItems, rightItems }) => (
  <div className="header">
    <div>{leftItems}</div>
    <div>{rightItems}</div>
  </div>
);

export default Header;
