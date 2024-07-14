import ConfirmModal from "../modals/ConfirmModal";
import Divider from "../../common/dataDisplay/Divider";
import List from "../../common/layouts/List";
import MenuItem from "../../common/dataDisplay/MenuItem";
import UserInfo from "./UserInfo";
import useToggle from "../../../hooks/useToggle";
import { deleteDialog } from "../../../redux/slices/dialogs";
import { deleteDialogAttachments } from "../../../services/attachments";
import { deleteDialogMessages } from "../../../redux/slices/messages";
import { DialogData } from "../../../types/dialogs";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RootState } from "../../../redux";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { UserData } from "../../../types/user";
import { useTranslation } from "react-i18next";

const DialogInfo: FC = () => {
  const [isConfirmModalOpen, toggleConfirmModal] = useToggle(false);

  const userId = useAppSelector((state: RootState) => state.user.id);
  const contacts = useAppSelector((state: RootState) => state.contacts.contacts);
  const dialogs = useAppSelector((state: RootState) => state.dialogs.dialogs);
  const selectedDialog = useAppSelector((state: RootState) => state.dialogs.selectedDialog);

  const currentDialog = dialogs?.find((dialog: DialogData) => dialog.id === selectedDialog);
  const interlocutorId = currentDialog?.users.filter((id: number) => id !== userId)[0];
  const { name } = contacts?.find((user: UserData) => user.id === interlocutorId) || {};

  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const handleDeleteDialog = async () => {
    await deleteDialogAttachments(selectedDialog);
    await dispatch(deleteDialogMessages(selectedDialog));
    await dispatch(deleteDialog(selectedDialog));
  };

  return (
    <>
      <List>
        <UserInfo name={name} />
        <Divider />
        <MenuItem
          className="text-danger"
          primaryElement={<FontAwesomeIcon icon={faTrash} />}
          text={t("messengerPage.dialogInfo.deleteDialog")}
          onClick={toggleConfirmModal}
        />
      </List>

      <ConfirmModal
        title={t("messengerPage.dialogInfo.deleteDialog")}
        text={t("messengerPage.dialogInfo.confirmDeleteDialog")}
        actionText={t("messengerPage.dialogInfo.delete")}
        isOpen={isConfirmModalOpen}
        toggle={toggleConfirmModal}
        handleAction={handleDeleteDialog}
      />
    </>
  );
};

export default DialogInfo;
