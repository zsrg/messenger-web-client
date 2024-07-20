import ChangePasswordModal from "./dialogs/ChangePasswordModal";
import List from "../../../common/layouts/List";
import MenuItem from "../../../common/dataDisplay/MenuItem";
import SessionsModal from "./dialogs/SessionsModal";
import useToggle from "../../../../hooks/useToggle";
import { faKey, faNetworkWired } from "@fortawesome/free-solid-svg-icons";
import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";

const SecurityPage: FC = () => {
  const [isChangePasswordModalOpen, toggleChangePasswordModal] = useToggle(false);
  const [isSessionsModalOpen, toggleSessionsModal] = useToggle(false);

  const { t } = useTranslation();

  return (
    <>
      <List>
        <MenuItem
          primaryElement={<FontAwesomeIcon icon={faKey} />}
          text={t("messengerPage.modals.settings.securityPage.changePassword")}
          onClick={toggleChangePasswordModal}
        />
        <MenuItem
          primaryElement={<FontAwesomeIcon icon={faNetworkWired} />}
          text={t("messengerPage.modals.settings.securityPage.activeSessions")}
          onClick={toggleSessionsModal}
        />
      </List>

      <ChangePasswordModal
        isOpen={isChangePasswordModalOpen}
        toggle={toggleChangePasswordModal}
      />
      <SessionsModal
        isOpen={isSessionsModalOpen}
        toggle={toggleSessionsModal}
      />
    </>
  );
};

export default SecurityPage;
