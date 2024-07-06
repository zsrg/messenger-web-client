import clsx from "clsx";
import { deleteNotification } from "../../../redux/slices/notifications";
import { faCircleCheck, faCircleExclamation, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FC, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NotificationData, NotificationType } from "../../../types/notifications";
import { SHOW_NOTIFICATION_TIME } from "../../../constants";
import { useAppDispatch } from "../../../redux/hooks";

const Notification: FC<NotificationData> = ({
  id,
  text,
  type = NotificationType.Info,
  showTime = SHOW_NOTIFICATION_TIME,
}) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    setTimeout(() => dispatch(deleteNotification(id)), showTime);
  }, []);

  const NotificationIcon = () => {
    switch (type) {
      case NotificationType.Info: {
        return <FontAwesomeIcon icon={faCircleInfo} />;
      }
      case NotificationType.Success: {
        return <FontAwesomeIcon icon={faCircleCheck} />;
      }
      case NotificationType.Error: {
        return <FontAwesomeIcon icon={faCircleExclamation} />;
      }
    }
  };

  return (
    <div className={clsx("notification", type)}>
      <NotificationIcon />
      <span>{text}</span>
    </div>
  );
};

export default Notification;
