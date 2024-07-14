import Button from "../../common/inputs/Button";
import ModalFooter from "../../common/modal/ModalFooter";
import ModalHeader from "../../common/modal/ModalHeader";
import ModalWindow from "../../common/modal/ModalWindow";
import ModalWrapper from "../../common/modal/ModalWrapper";
import { ChangeEvent, FC } from "react";
import { useTranslation } from "react-i18next";

interface SendImageModalProps {
  image: File;
  text: string;
  isOpen: boolean;
  toggle: () => void;
  handleSend: () => void;
  handleChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const SendImageModal: FC<SendImageModalProps> = ({
  image,
  text,
  isOpen,
  toggle,
  handleSend,
  handleChange,
}) => {
  const { t } = useTranslation();

  const src = image && URL.createObjectURL(image);

  const handleSendClick = () => {
    handleSend();
    toggle();
  };

  return (
    <ModalWrapper isOpen={isOpen} toggle={toggle}>
      <ModalWindow>
        <ModalHeader toggle={toggle}>
          {t("messengerPage.modals.sendImageModal.title")}
        </ModalHeader>

        <div className="send-image-modal">
          <img className="send-image-modal__image" src={src} />
          <textarea
            className="send-image-modal__textarea text-input__input"
            placeholder={t("messengerPage.newMessageForm.writeMessage")}
            value={text}
            onChange={handleChange}
            autoFocus
          />
        </div>

        <ModalFooter>
          <Button onClick={toggle}>
            {t("messengerPage.modals.sendImageModal.cancel")}
          </Button>
          <Button onClick={handleSendClick}>
            {t("messengerPage.modals.sendImageModal.send")}
          </Button>
        </ModalFooter>
      </ModalWindow>
    </ModalWrapper>
  );
};

export default SendImageModal;
