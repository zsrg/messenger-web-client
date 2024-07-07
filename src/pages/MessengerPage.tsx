import clsx from "clsx";
import DialogsHeader from "../components/messengerPage/DialogsHeader";
import DialogsList from "../components/messengerPage/dialogsList/DialogsList";
import { DialogData } from "../types/dialogs";
import { FC, useEffect } from "react";
import { getContacts } from "../redux/slices/contacts";
import { getDialogs } from "../redux/slices/dialogs";
import { getLastMessages } from "../redux/slices/messages";
import { getUserData } from "../redux/slices/user";
import { isNullish } from "../helpers/compare";
import { RootState } from "../redux";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const MessengerPage: FC = () => {
  const dispatch = useAppDispatch();

  const selectedDialog = useAppSelector((state: RootState) => state.dialogs.selectedDialog);

  useEffect(() => {
    dispatch(getUserData())
      .then(() => dispatch(getContacts()))
      .then(() => dispatch(getDialogs()))
      .then(({ payload }) => dispatch(getLastMessages((payload as DialogData[]).map((data) => data.id))));
  }, []);

  return (
    <div className="messenger-page">
      <div
        className={clsx("messenger-page__sidebar", {
          "dont-show-on-mobile": !isNullish(selectedDialog),
        })}
      >
        <DialogsHeader />
        <DialogsList />
      </div>
    </div>
  );
};

export default MessengerPage;
