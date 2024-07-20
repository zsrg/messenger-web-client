import Divider from "../../../../common/dataDisplay/Divider";
import If from "../../../../common/utils/If";
import List from "../../../../common/layouts/List";
import MenuItem from "../../../../common/dataDisplay/MenuItem";
import ModalHeader from "../../../../common/modal/ModalHeader";
import ModalWindow from "../../../../common/modal/ModalWindow";
import ModalWrapper from "../../../../common/modal/ModalWrapper";
import useConfirm from "../../../../../hooks/useConfirm";
import useDate from "../../../../../hooks/useDate";
import { deleteSession } from "../../../../../redux/slices/user";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FC, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RootState } from "../../../../../redux";
import { SessionData } from "../../../../../types/user";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { useTranslation } from "react-i18next";

interface SessionsModalProps {
  isOpen: boolean;
  toggle: () => void;
}

const SessionsModal: FC<SessionsModalProps> = ({ isOpen, toggle }) => {
  const sessions = useAppSelector((state: RootState) => state.user.sessions);
  const sessionId = useAppSelector((state: RootState) => state.user.sessionId);

  const currentSession = sessions.filter((session: SessionData) => session.id === sessionId);
  const otherSessions = sessions.filter((session: SessionData) => session.id !== sessionId);

  const [selectedSession, setSelectedSession] = useState<string>("");

  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const handleDeleteSession = () => dispatch(deleteSession(selectedSession));

  const [toggleConfirm, ConfirmModal] = useConfirm("messengerPage.modals.sessionsModal.confirmDeleteSession", handleDeleteSession);

  const Sessions = ({ sessions, className = "" }) => {
    return sessions.map((session: SessionData) => {
      const { fullDate } = useDate(session.creationDate);

      const deleteSessionClick = (session: string) => {
        setSelectedSession(session);
        toggleConfirm();
      };

      return (
        <MenuItem
          className={className}
          text={session.id}
          secondaryText={fullDate}
          secondaryElement={<FontAwesomeIcon icon={faTrash} />}
          onClick={() => deleteSessionClick(session.id)}
        />
      );
    });
  };

  return (
    <>
      <ModalWrapper isOpen={isOpen} toggle={toggle}>
        <ModalWindow fixed>
          <ModalHeader toggle={toggle}>
            {t("messengerPage.modals.sessionsModal.title")}
          </ModalHeader>
          <List>
            <Sessions sessions={currentSession} className="text-success" />
            <If condition={sessions?.length > 1}>
              <Divider />
              <Sessions sessions={otherSessions} />
            </If>
          </List>
        </ModalWindow>
      </ModalWrapper>

      <ConfirmModal />
    </>
  );
};

export default SessionsModal;
