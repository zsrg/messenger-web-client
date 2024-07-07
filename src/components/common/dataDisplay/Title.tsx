import clsx from "clsx";
import { FC } from "react";

export interface TitleProps {
  children: string;
  onClick?: () => void;
}

const Title: FC<TitleProps> = ({ children, onClick }) => (
  <span className={clsx("title", { action: onClick })} onClick={onClick}>
    {children}
  </span>
);

export default Title;
