import Avatar from "../../common/dataDisplay/Avatar";
import List from "../../common/layouts/List";
import MenuItem from "../../common/dataDisplay/MenuItem";
import ModalHeader from "../../common/modal/ModalHeader";
import ModalWindow from "../../common/modal/ModalWindow";
import ModalWrapper from "../../common/modal/ModalWrapper";
import { createDialog, selectDialog } from "../../../redux/slices/dialogs";
import { DialogData } from "../../../types/dialogs";
import { FC } from "react";
import { isNullish } from "../../../helpers/compare";
import { RootState } from "../../../redux";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { UserData } from "../../../types/user";
import { useTranslation } from "react-i18next";

interface ContactsModalProps {
  isOpen: boolean;
  toggle: () => void;
}

const ContactsModal: FC<ContactsModalProps> = ({ isOpen, toggle }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const userId = useAppSelector((state: RootState) => state.user.id);
  const contacts = useAppSelector((state: RootState) => state.contacts.contacts);
  const dialogs = useAppSelector((state: RootState) => state.dialogs.dialogs);

  const handleCreateDialog = (userId: number) => {
    dispatch(createDialog({ userId })).then(() => toggle());
  };

  const handleOpenDialog = (dialogId: number) => {
    dispatch(selectDialog(dialogId));
    toggle();
  };

  const Contacts = () => {
    const items: JSX.Element[] = [];

    contacts?.forEach(({ id, name }: UserData) => {
      if (id === userId) {
        return;
      }

      const dialogId = dialogs.filter((dialog: DialogData) => dialog.users.includes(id))[0]?.id;

      items.push(
        <MenuItem
          key={`contact-${id}`}
          primaryElement={<Avatar size="sm" name={name} />}
          text={name}
          onClick={() => isNullish(dialogId) ? handleCreateDialog(id) : handleOpenDialog(dialogId)}
        />
      );
    });

    return items;
  };

  return (
    <ModalWrapper isOpen={isOpen} toggle={toggle}>
      <ModalWindow fixed>
        <ModalHeader toggle={toggle}>
          {t("messengerPage.modals.contactsModal.title")}
        </ModalHeader>
        <List>
          <Contacts />
        </List>
      </ModalWindow>
    </ModalWrapper>
  );
};

export default ContactsModal;
