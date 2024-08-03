import clsx from "clsx";
import { FC, MutableRefObject, UIEventHandler } from "react";

export interface ListProps {
  children: JSX.Element | JSX.Element[];
  className?: string;
  listRef?: MutableRefObject<HTMLDivElement>;
  onScroll?: UIEventHandler<HTMLDivElement>;
}

const List: FC<ListProps> = ({ children, className, listRef, onScroll }) => (
  <div className={clsx("list", className)} ref={listRef} onScroll={onScroll}>
    {children}
  </div>
);

export default List;
