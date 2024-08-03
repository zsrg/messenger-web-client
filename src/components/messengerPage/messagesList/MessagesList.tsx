import List from "../../common/layouts/List";
import MessagesListDivider from "./MessagesListDivider";
import MessagesListItem from "./MessagesListItem";
import useDebounce from "../../../hooks/useDebounce";
import { FC, useEffect, useRef } from "react";
import { getMessages } from "../../../redux/slices/messages";
import { RootState } from "../../../redux";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";

const MessagesList: FC = () => {
  const selectedDialog = useAppSelector((state: RootState) => state.dialogs.selectedDialog);
  const messages = useAppSelector((state: RootState) => state.messages.messages);
  const messagesInfo = useAppSelector((state: RootState) => state.messages.messagesInfo);
  const userId = useAppSelector((state: RootState) => state.user.id);

  const dialogMessages = messages.get(selectedDialog);
  const dialogMessagesInfo = messagesInfo.get(selectedDialog);

  const listRef = useRef<HTMLDivElement>(null);
  const prevScrollHeight = useRef<number>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    prevScrollHeight.current = null;
    scrollListToEnd();
  }, [selectedDialog]);

  const scrollListToEnd = useDebounce(() => {
    const isListScrolled = prevScrollHeight.current !== null;

    if (!isListScrolled && listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, 100);

  const scrollListToPrevScrollHeight = useDebounce(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight - prevScrollHeight.current;
    }
  }, 100);

  const handleScroll = () => {
    const { id: sinceId } = dialogMessages?.[0] || {};
    const { isAllLoaded } = dialogMessagesInfo || {};

    if (listRef.current.scrollTop === 0 && sinceId && !isAllLoaded) {
      prevScrollHeight.current = listRef.current.scrollHeight;

      dispatch(getMessages({ dialogId: selectedDialog, sinceId })).then(() => {
        scrollListToPrevScrollHeight();
      });
    }
  };

  const Messages = () => {
    const messagesList: JSX.Element[] = [];

    dialogMessages?.forEach(({ id, userId: messageUserId, date, text, attachmentId }, i: number) => {

      if (i === 0 || new Date(date).getDay() !== new Date(dialogMessages[i - 1].date).getDay()) {
        messagesList.push(
          <MessagesListDivider
            key={`divider-${id}`}
            date={date}
          />
        );
      }

      messagesList.push(
        <MessagesListItem
          key={`message-${id}`}
          text={text}
          date={date}
          attachmentId={attachmentId}
          onAttachmentLoad={scrollListToEnd}
          isIncoming={messageUserId === userId}
        />
      );
    });

    return messagesList;
  };

  return (
    <List
      className="messages-list"
      listRef={listRef}
      onScroll={handleScroll}
    >
      <Messages />
    </List>
  );
};

export default MessagesList;
