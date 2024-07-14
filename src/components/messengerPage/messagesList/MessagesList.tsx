import List from "../../common/layouts/List";
import MessagesListDivider from "./MessagesListDivider";
import MessagesListItem from "./MessagesListItem";
import useDebounce from "../../../hooks/useDebounce";
import { FC, useEffect, useRef } from "react";
import { RootState } from "../../../redux";
import { useAppSelector } from "../../../redux/hooks";

const MessagesList: FC = () => {
  const selectedDialog = useAppSelector((state: RootState) => state.dialogs.selectedDialog);
  const messages = useAppSelector((state: RootState) => state.messages.messages);
  const userId = useAppSelector((state: RootState) => state.user.id);

  const dialogMessages = messages.get(selectedDialog);

  const listRef = useRef<HTMLDivElement>(null);

  const scrollList = useDebounce(() => {
    const element = listRef.current?.childNodes[listRef.current?.childNodes.length - 1] as HTMLDivElement;
    element?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, 100);

  useEffect(() => {
    scrollList();
  }, [selectedDialog]);

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
          onAttachmentLoad={scrollList}
          isIncoming={messageUserId === userId}
        />
      );
    });

    return messagesList;
  };

  return (
    <List listRef={listRef}>
      <Messages />
    </List>
  );
};

export default MessagesList;
