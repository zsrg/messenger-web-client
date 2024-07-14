import Center from "../components/common/layouts/Center";
import clsx from "clsx";
import DialogInfo from "../components/messengerPage/common/DialogInfo";
import DialogInfoHeader from "../components/messengerPage/DialogInfoHeader";
import DialogsHeader from "../components/messengerPage/DialogsHeader";
import DialogsList from "../components/messengerPage/dialogsList/DialogsList";
import If from "../components/common/utils/If";
import MessagesHeader from "../components/messengerPage/MessagesHeader";
import useToggle from "../hooks/useToggle";
import { DialogData } from "../types/dialogs";
import { FC, useEffect } from "react";
import { getContacts } from "../redux/slices/contacts";
import { getDialogs } from "../redux/slices/dialogs";
import { getLastMessages } from "../redux/slices/messages";
import { getUserData } from "../redux/slices/user";
import { isNullish } from "../helpers/compare";
import { RootState } from "../redux";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useTranslation } from "react-i18next";

const MessengerPage: FC = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const [isDialogInfoOpen, toggleDialogInfo] = useToggle(true);

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
          "dont-show-on-compact": !isNullish(selectedDialog),
        })}
      >
        <DialogsHeader />
        <DialogsList />
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
