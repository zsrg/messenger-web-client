import Center from "../components/common/layouts/Center";
import clsx from "clsx";
import DialogInfo from "../components/messengerPage/common/DialogInfo";
import DialogInfoHeader from "../components/messengerPage/DialogInfoHeader";
import DialogsHeader from "../components/messengerPage/DialogsHeader";
import DialogsList from "../components/messengerPage/dialogsList/DialogsList";
import If from "../components/common/utils/If";
import MainMenu from "../components/messengerPage/MainMenu";
import MessagesHeader from "../components/messengerPage/MessagesHeader";
import MessagesList from "../components/messengerPage/messagesList/MessagesList";
import NewMessageForm from "../components/messengerPage/NewMessageForm";
import useToggle from "../hooks/useToggle";
import { CustomPayloadAction } from "../types/common";
import { deleteSession } from "../services/user";
import { DialogData } from "../types/dialogs";
import { FC, useEffect } from "react";
import { getContacts } from "../redux/slices/contacts";
import { getDialogs } from "../redux/slices/dialogs";
import { getLastMessages, getMessages } from "../redux/slices/messages";
import { getSessions, getUserData } from "../redux/slices/user";
import { isNullish } from "../helpers/compare";
import { RootState } from "../redux";
import { subscribe } from "../redux/listener";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useTranslation } from "react-i18next";

const MessengerPage: FC = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const [isMenuOpen, toggleMenu] = useToggle(false);
  const [isDialogInfoOpen, toggleDialogInfo] = useToggle(true);

  const selectedDialog = useAppSelector((state: RootState) => state.dialogs.selectedDialog);
  const messages = useAppSelector((state: RootState) => state.messages.messages);

  useEffect(() => {
    dispatch(getUserData())
      .then(() => dispatch(getSessions()))
      .then(() => dispatch(getContacts()))
      .then(() => dispatch(getDialogs()))
      .then((action: CustomPayloadAction<DialogData>) => {
        if (action.meta.requestStatus === "fulfilled") {
          dispatch(getLastMessages(action.payload?.map((data: DialogData) => data.id)));
        }
      });

    dispatch(subscribe());

    window.addEventListener("unload", handleUnload);

    return () => {
      window.removeEventListener("unload", handleUnload);
    };
  }, []);

  const handleUnload = () => {
    deleteSession();
  };

  useEffect(() => {
    if (!isNullish(selectedDialog) && !messages.has(selectedDialog)) {
      dispatch(getMessages({ dialogId: selectedDialog, sinceId: -1 }));
    }
  }, [selectedDialog]);

  return (
    <div className="messenger-page">
      <div
        className={clsx("messenger-page__sidebar", {
          "dont-show-on-compact": !isNullish(selectedDialog),
        })}
      >
        <DialogsHeader
          isMenuOpen={isMenuOpen}
          toggleMenu={toggleMenu}
        />
        <If
          condition={isMenuOpen}
          then={<MainMenu />}
          else={<DialogsList />}
        />
      </div>
      <If
        condition={!isNullish(selectedDialog)}
        then={
          <>
            <div className="messenger-page__content">
              <MessagesHeader
                isDialogInfoOpen={isDialogInfoOpen}
                toggleDialogInfo={toggleDialogInfo}
              />
              <MessagesList />
              <NewMessageForm />
            </div>

            <If condition={isDialogInfoOpen}>
              <div className="messenger-page__sidebar dont-show-on-compact">
                <DialogInfoHeader toggleDialogInfo={toggleDialogInfo} />
                <DialogInfo />
              </div>
            </If>
          </>
        }
        else={
          <Center className="dont-show-on-compact">
            <span>{t("messengerPage.selectDialogMessage")}</span>
          </Center>
        }
      />
    </div>
  );
};

export default MessengerPage;
