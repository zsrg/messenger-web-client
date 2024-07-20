import FileInput from "../common/inputs/FileInput";
import IconButton from "../common/inputs/IconButton";
import SendImageModal from "./modals/SendImageModal";
import useToggle from "../../hooks/useToggle";
import { ChangeEvent, FC, KeyboardEvent, useEffect, useRef, useState } from "react";
import { createAttachment } from "../../services/attachments";
import { CreateAttachmentData } from "../../types/attachments";
import { CustomPayloadAction } from "../../types/common";
import { faPaperclip, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MessageData, SendMessageData } from "../../types/messages";
import { RootState } from "../../redux";
import { sendMessage } from "../../redux/slices/messages";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useTranslation } from "react-i18next";

const NewMessageForm: FC = () => {
  const [messageText, setMessageText] = useState<string>("");
  const [messageImage, setMessageImage] = useState<File>(null);

  const dispatch = useAppDispatch();

  const selectedDialog = useAppSelector((state: RootState) => state.dialogs.selectedDialog);

  const fileInput = useRef<HTMLInputElement>(null);
  const messageTextArea = useRef<HTMLTextAreaElement>(null);

  const [isSendImageModalOpen, toggleSendImageModal] = useToggle(false);

  const { t } = useTranslation();

  useEffect(() => {
    setMessageText("");
    setMessageImage(null);
  }, [selectedDialog]);

  useEffect(() => {
    if (!isSendImageModalOpen && fileInput.current) {
      fileInput.current.value = null;
    }
  }, [isSendImageModalOpen]);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessageText(e.target.value);
  };

  const handleFileImport = (e: ChangeEvent<HTMLInputElement>) => {
    setMessageImage(e.target.files[0]);
    toggleSendImageModal();
  };

  const handleSendMessage = async () => {
    if (messageText || messageImage) {
      let attachmentId = null;

      if (messageImage) {
        const createAttachmentData: CreateAttachmentData = {
          dialogId: selectedDialog,
          base64: (await fileToBase64(messageImage)) as string,
        };

        attachmentId = (await createAttachment(createAttachmentData))?.id;
      }

      const sendMessageData: SendMessageData = {
        dialogId: selectedDialog,
        text: messageText,
      };

      if (attachmentId) {
        sendMessageData.attachmentId = attachmentId;
      }

      dispatch(sendMessage(sendMessageData))
        .then((data: CustomPayloadAction<MessageData>) => {
          if (data.meta?.requestStatus === "fulfilled") {
            setMessageText("");
            setMessageImage(null);
          }
        });
    }
  };

  const fileToBase64 = (file: File) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(reader.error);
    });

  const handleKeyeDown = (e: KeyboardEvent) => {
    const isEnterKeyDown = e.code === "Enter";
    const isCtrlKeyDown = e.ctrlKey;

    if (isEnterKeyDown) {
      e.preventDefault();

      if (isCtrlKeyDown) {
        setMessageText((messageText) => messageText + "\n");
        setTimeout(() => messageTextArea.current.scrollTop = messageTextArea.current.scrollHeight);
      } else {
        handleSendMessage();
      }
    }
  };

  return (
    <>
      <div className="new-message-form">
        <div className="new-message-form__controls">
          <FileInput
            accept=".png, .jpg, .jpeg"
            title={t("messengerPage.newMessageForm.addFile")}
            inputRef={fileInput}
            onChange={handleFileImport}
          >
            <FontAwesomeIcon icon={faPaperclip} />
          </FileInput>
        </div>

        <textarea
          className="new-message-form__textarea"
          ref={messageTextArea}
          placeholder={t("messengerPage.newMessageForm.writeMessage")}
          value={messageText}
          onChange={handleChange}
          onKeyDown={handleKeyeDown}
          autoFocus
        />

        <div className="new-message-form__controls">
          <IconButton
            title={t("messengerPage.newMessageForm.enterDescription")}
            disabled={!messageText && !messageImage}
            onClick={handleSendMessage}
          >
            <FontAwesomeIcon icon={faPaperPlane} />
          </IconButton>
        </div>
      </div>

      <SendImageModal
        image={messageImage}
        text={messageText}
        isOpen={isSendImageModalOpen}
        toggle={toggleSendImageModal}
        handleSend={handleSendMessage}
        handleChange={handleChange}
      />
    </>
  );
};

export default NewMessageForm;
