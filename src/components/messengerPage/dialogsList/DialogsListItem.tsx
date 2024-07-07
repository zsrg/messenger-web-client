import Avatar from "../../common/dataDisplay/Avatar";
import clsx from "clsx";
import useDate from "../../../hooks/useDate";
import { FC } from "react";
import { isNullish } from "../../../helpers/compare";
import { useTranslation } from "react-i18next";

export interface DialogsListItemProps {
  name: string;
  date: string;
  text: string;
  attachmentId: number;
  selected: boolean;
  onClick: () => void;
}

const DialogsListItem: FC<DialogsListItemProps> = ({
  name,
  date,
  text,
  attachmentId,
  selected,
  onClick,
}) => {
  const { t } = useTranslation();
  const { HHmm, ddMMyyyy, isToday } = useDate(date);

  return (
    <div
      className={clsx("list-item", "dialogs-list-item", { selected })}
      onClick={onClick}
    >
      <div className="dialogs-list-item__avatar">
        <Avatar name={name} />
      </div>
      <div className="dialogs-list-item__text">
        <div>
          <span>{name}</span>
          <span>{date ? (isToday ? HHmm : ddMMyyyy) : ""}</span>
        </div>
        <span>
          {!isNullish(attachmentId) ? t("messengerPage.dialogsList.file") : text || ""}
        </span>
      </div>
    </div>
  );
};

export default DialogsListItem;
