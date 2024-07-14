import clsx from "clsx";
import If from "../../common/utils/If";
import ImageLightbox from "../modals/ImageLightbox";
import useDate from "../../../hooks/useDate";
import useToggle from "../../../hooks/useToggle";
import { FC, useEffect, useState } from "react";
import { getAttachment } from "../../../redux/slices/attachments";
import { RootState } from "../../../redux";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";

export interface MessageListItemProps {
  text?: string;
  attachmentId: number;
  date: string;
  isIncoming: boolean;
  onAttachmentLoad: () => void;
}

const MessageListItem: FC<MessageListItemProps> = ({
  text,
  attachmentId,
  date,
  isIncoming,
  onAttachmentLoad,
}) => {
  const [image, setImage] = useState<string>(null);
  const [isImageLightboxOpen, toggleImageLightbox] = useToggle(false);

  const { HHmm, ddMonth } = useDate(date);

  const dispatch = useAppDispatch();

  const attachments = useAppSelector((state: RootState) => state.attachments.attachments);

  useEffect(() => {
    if (attachmentId) {
      if (attachments.has(attachmentId)) {
        setImage(attachments.get(attachmentId));
      } else {
        dispatch(getAttachment(attachmentId));
      }
    }
  }, []);

  useEffect(() => {
    if (attachmentId && !image && attachments.has(attachmentId)) {
      setImage(attachments.get(attachmentId));
    }
  }, [attachments]);

  useEffect(() => {
    onAttachmentLoad();
  }, [image]);

  return (
    <>
      <div
        className={clsx(
          "messages-list-item-wrapper",
          isIncoming ? "from-me-message" : "to-me-message"
        )}
      >
        <div className="messages-list-item">
          <If condition={image}>
            <img
              className="messages-list-item__image"
              onClick={toggleImageLightbox}
              src={image}
            />
          </If>
          <If condition={text}>
            <span className="messages-list-item__text">
              {text}
            </span>
          </If>
          <span
            className="messages-list-item__info"
            title={`${ddMonth} ${HHmm}`}
          >
            {HHmm}
          </span>
        </div>
      </div>

      <ImageLightbox
        image={image}
        isOpen={isImageLightboxOpen}
        toggle={toggleImageLightbox}
      />
    </>
  );
};

export default MessageListItem;
