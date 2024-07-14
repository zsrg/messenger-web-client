import clsx from "clsx";
import { FC } from "react";

export interface CenterProps {
  children: JSX.Element;
  className?: string;
}

const Center: FC<CenterProps> = ({ children, className }) => (
  <div className={clsx("center", className)}>{children}</div>
);

export default Center;
