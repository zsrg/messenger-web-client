import Button from "../components/common/inputs/Button";
import MenuItem from "../components/common/dataDisplay/MenuItem";
import ModalFooter from "../components/common/modal/ModalFooter";
import ModalHeader from "../components/common/modal/ModalHeader";
import ModalWindow from "../components/common/modal/ModalWindow";
import ModalWrapper from "../components/common/modal/ModalWrapper";
import useToggle from "./useToggle";
import { FC } from "react";
import { useTranslation } from "react-i18next";

type ReturnedType = [() => void, FC];

const useConfirm = (text: string, action: () => Promise<any>): ReturnedType => {
  const [isModalOpen, toggleModal] = useToggle(false);
  const { t } = useTranslation();

  const handleActionClick = () => action().then(toggleModal);

  const Modal: FC = () => (
    <ModalWrapper isOpen={isModalOpen} toggle={toggleModal}>
      <ModalWindow>
        <ModalHeader toggle={toggleModal}>
          {t("messengerPage.modals.confirmModal.title")}
        </ModalHeader>
        <MenuItem text={t(text)} disableHover />
        <ModalFooter>
          <Button onClick={toggleModal}>
            {t("messengerPage.modals.confirmModal.cancel")}
          </Button>
          <Button onClick={handleActionClick}>
            {t("messengerPage.modals.confirmModal.yes")}
          </Button>
        </ModalFooter>
      </ModalWindow>
    </ModalWrapper>
  );

  return [toggleModal, Modal];
};

export default useConfirm;
