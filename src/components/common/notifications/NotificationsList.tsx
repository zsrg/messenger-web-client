import List from "../layouts/List";
import Notification from "./Notification";
import { FC } from "react";
import { NotificationData } from "../../../types/notifications";
import { RootState } from "../../../redux";
import { useAppSelector } from "../../../redux/hooks";

const NotificationsList: FC = () => {
  const notifications = useAppSelector((state: RootState) => state.notifications.notifications);

  return (
    <List className="notifications-list">
      {notifications.map(({ id, type, text, showTime }: NotificationData) => (
        <Notification key={id} id={id} type={type} text={text} showTime={showTime} />
      ))}
    </List>
  );
};

export default NotificationsList;
