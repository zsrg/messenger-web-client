import DialogsListItem from "./DialogsListItem";
import List from "../../common/layouts/List";
import { DialogData } from "../../../types/dialogs";
import { FC } from "react";
import { RootState } from "../../../redux";
import { selectDialog } from "../../../redux/slices/dialogs";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { UserData } from "../../../types/user";

const DialogsList: FC = () => {
  const userId = useAppSelector((state: RootState) => state.user.id);
  const contacts = useAppSelector((state: RootState) => state.contacts.contacts);
  const dialogs = useAppSelector((state: RootState) => state.dialogs.dialogs);
  const selectedDialog = useAppSelector((state: RootState) => state.dialogs.selectedDialog);
  const filter = useAppSelector((state: RootState) => state.dialogs.filter);
  const lastMessages = useAppSelector((state: RootState) => state.messages.lastMessages);

  const dispatch = useAppDispatch();

  const Dialogs = () => {
    const items: JSX.Element[] = [];

    dialogs?.forEach(({ id, users }: DialogData) => {
      const interlocutorId = users.filter((id: number) => id !== userId)[0];
      const { name } = contacts?.find((user: UserData) => user.id === interlocutorId) || {};
      const { date, text, attachmentId } = lastMessages?.get(id) || {};

      if (filter && !name?.toLowerCase().includes(filter?.toLowerCase())) {
        return;
      }

      items.push(
        <DialogsListItem
          key={`dialog-${id}`}
          name={name}
          date={date}
          text={text}
          attachmentId={attachmentId}
          selected={id === selectedDialog}
          onClick={() => handleDialogClick(id)}
        />
      );
    });

    items.sort((a, b) => new Date(a.props?.date) < new Date(b.props?.date) ? 1 : -1);

    return items;
  };

  const handleDialogClick = (dialogId: number) => {
    dispatch(selectDialog(dialogId));
  };

  return (
    <List>
      <Dialogs />
    </List>
  );
};

export default DialogsList;
