import DialogInfoModal from "./modals/DialogInfoModal";
import Header from "../common/layouts/Header";
import IconButton from "../common/inputs/IconButton";
import Title from "../common/dataDisplay/Title";
import useToggle from "../../hooks/useToggle";
import { DialogData } from "../../types/dialogs";
import { faArrowLeft, faCircleInfo, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RootState } from "../../redux";
import { selectDialog } from "../../redux/slices/dialogs";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { UserData } from "../../types/user";
import { useTranslation } from "react-i18next";

export interface MessagesHeaderProps {
  isDialogInfoOpen: boolean;
  toggleDialogInfo: () => void;
}

const MessagesHeader: FC<MessagesHeaderProps> = ({
  isDialogInfoOpen,
  toggleDialogInfo,
}) => {
  const [isDialogInfoModalOpen, toggleDialogInfoModal] = useToggle(false);

  const userId = useAppSelector((state: RootState) => state.user.id);
  const contacts = useAppSelector((state: RootState) => state.contacts.contacts);
  const dialogs = useAppSelector((state: RootState) => state.dialogs.dialogs);
  const selectedDialog = useAppSelector((state: RootState) => state.dialogs.selectedDialog);

  const currentDialog = dialogs?.find((dialog: DialogData) => dialog.id === selectedDialog);
  const interlocutorId = currentDialog?.users.filter((id: number) => id !== userId)[0];
  const { name } = contacts?.find((user: UserData) => user.id === interlocutorId) || {};

  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const handleDialogCloseClick = () => {
    dispatch(selectDialog(null));
  };

  return (
    <>
      <Header
        leftItems={
          <>
            <IconButton
              className="show-on-compact"
              onClick={handleDialogCloseClick}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </IconButton>

            <Title onClick={toggleDialogInfoModal}>{name}</Title>
          </>
        }
        rightItems={
          <>
            <IconButton
              className="dont-show-on-compact"
              onClick={toggleDialogInfo}
              active={isDialogInfoOpen}
              title={t("messengerPage.messagesHeader.dialogInfo")}
            >
              <FontAwesomeIcon icon={faCircleInfo} />
            </IconButton>

            <IconButton
              className="dont-show-on-compact"
              onClick={handleDialogCloseClick}
              title={t("messengerPage.messagesHeader.closeDialog")}
            >
              <FontAwesomeIcon icon={faXmark} />
            </IconButton>
          </>
        }
      />

      <DialogInfoModal
        isOpen={isDialogInfoModalOpen}
        toggle={toggleDialogInfoModal}
      />
    </>
  );
};

export default MessagesHeader;
