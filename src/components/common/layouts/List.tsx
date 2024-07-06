import clsx from "clsx";
import { FC, MutableRefObject } from "react";

export interface ListProps {
  children: JSX.Element | JSX.Element[];
  className?: string;
  listRef?: MutableRefObject<HTMLDivElement>;
}

const List: FC<ListProps> = ({ children, className, listRef }) => (
  <div className={clsx("list", className)} ref={listRef}>
    {children}
  </div>
);

export default List;
