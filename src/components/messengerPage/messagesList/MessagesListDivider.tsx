import useDate from "../../../hooks/useDate";
import { FC } from "react";

export interface MessagesListDividerProps {
  date: string;
}

const MessagesListDivider: FC<MessagesListDividerProps> = ({ date }) => {
  const { ddMonth } = useDate(date);

  return (
    <div className="messages-list-divider">
      <span>{ddMonth}</span>
    </div>
  );
};

export default MessagesListDivider;
