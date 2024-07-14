import DialogInfo from "../common/DialogInfo";
import ModalHeader from "../../common/modal/ModalHeader";
import ModalWindow from "../../common/modal/ModalWindow";
import ModalWrapper from "../../common/modal/ModalWrapper";
import { FC } from "react";
import { useTranslation } from "react-i18next";

interface DialogInfoModalProps {
  isOpen: boolean;
  toggle: () => void;
}

const DialogInfoModal: FC<DialogInfoModalProps> = ({ isOpen, toggle }) => {
  const { t } = useTranslation();

  return (
    <ModalWrapper isOpen={isOpen} toggle={toggle}>
      <ModalWindow fixed>
        <ModalHeader toggle={toggle}>
          {t("messengerPage.modals.dialogInfoModal.title")}
        </ModalHeader>
        <DialogInfo />
      </ModalWindow>
    </ModalWrapper>
  );
};

export default DialogInfoModal;
