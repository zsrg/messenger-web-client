import AppearancePage from "./AppearancePage";
import Divider from "../../../common/dataDisplay/Divider";
import EditProfilePage from "./EditProfilePage";
import InfoPage from "./InfoPage";
import LanguagePage from "./LanguagePage";
import List from "../../../common/layouts/List";
import MenuItem from "../../../common/dataDisplay/MenuItem";
import ModalHeader from "../../../common/modal/ModalHeader";
import ModalWindow from "../../../common/modal/ModalWindow";
import ModalWrapper from "../../../common/modal/ModalWrapper";
import SecurityPage from "./SecurityPage";
import useConfirm from "../../../../hooks/useConfirm";
import UserInfo from "../../common/UserInfo";
import { deleteSession } from "../../../../redux/slices/user";
import { faGlobe, faInfoCircle, faLock, faPalette, faRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import { FC, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RootState } from "../../../../redux";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { useTranslation } from "react-i18next";

export interface SettingsModalProps {
  isOpen: boolean;
  toggle: () => void;
}

enum SettingsPages {
  MainPage,
  EditProfilePage,
  SecurityPage,
  LanguagePage,
  AppearancePage,
  InfoPage,
}

const SettingsModal: FC<SettingsModalProps> = ({ isOpen, toggle }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const name = useAppSelector((state: RootState) => state.user.name);
  const login = useAppSelector((state: RootState) => state.user.login);

  const [selectedPage, setSelectedPage] = useState<SettingsPages>(SettingsPages.MainPage);

  const isMainPage = selectedPage === SettingsPages.MainPage;

  const handlePrevClick = !isMainPage ? () => setSelectedPage(SettingsPages.MainPage) : undefined;
  const handleLogOutClick = () => dispatch(deleteSession());

  const [toggleConfirm, ConfirmModal] = useConfirm("messengerPage.modals.settings.confirmLogOut", handleLogOutClick);

  useEffect(() => {
    if (!isOpen) {
      setSelectedPage(SettingsPages.MainPage);
    }
  }, [isOpen]);

  const MainPage = () => (
    <List>
      <UserInfo name={name} login={login} />
      <Divider />
      <MenuItem
        primaryElement={<FontAwesomeIcon icon={faUser} />}
        text={pages[SettingsPages.EditProfilePage].title}
        onClick={() => setSelectedPage(SettingsPages.EditProfilePage)}
      />
      <MenuItem
        primaryElement={<FontAwesomeIcon icon={faLock} />}
        text={pages[SettingsPages.SecurityPage].title}
        onClick={() => setSelectedPage(SettingsPages.SecurityPage)}
      />
      <MenuItem
        primaryElement={<FontAwesomeIcon icon={faGlobe} />}
        text={pages[SettingsPages.LanguagePage].title}
        onClick={() => setSelectedPage(SettingsPages.LanguagePage)}
      />
      <MenuItem
        primaryElement={<FontAwesomeIcon icon={faPalette} />}
        text={pages[SettingsPages.AppearancePage].title}
        onClick={() => setSelectedPage(SettingsPages.AppearancePage)}
      />
      <MenuItem
        primaryElement={<FontAwesomeIcon icon={faInfoCircle} />}
        text={pages[SettingsPages.InfoPage].title}
        onClick={() => setSelectedPage(SettingsPages.InfoPage)}
      />
      <MenuItem
        className="text-danger"
        primaryElement={<FontAwesomeIcon icon={faRightFromBracket} />}
        text={t("messengerPage.modals.settings.logOut")}
        onClick={toggleConfirm}
      />
    </List>
  );

  const pages = {
    [SettingsPages.MainPage]: { title: t("messengerPage.modals.settings.settings"), page: <MainPage /> },
    [SettingsPages.EditProfilePage]: { title: t("messengerPage.modals.settings.editProfile"), page: <EditProfilePage /> },
    [SettingsPages.SecurityPage]: { title: t("messengerPage.modals.settings.security"), page: <SecurityPage /> },
    [SettingsPages.LanguagePage]: { title: t("messengerPage.modals.settings.language"), page: <LanguagePage /> },
    [SettingsPages.AppearancePage]: { title: t("messengerPage.modals.settings.appearance"), page: <AppearancePage /> },
    [SettingsPages.InfoPage]: { title: t("messengerPage.modals.settings.info"), page: <InfoPage />, }
  };

  const { title, page } = pages[selectedPage] || {};

  return (
    <>
      <ModalWrapper isOpen={isOpen} toggle={toggle}>
        <ModalWindow fixed>
          <ModalHeader toggle={toggle} handlePrev={handlePrevClick}>
            {title}
          </ModalHeader>
          {page}
        </ModalWindow>
      </ModalWrapper>

      <ConfirmModal />
    </>
  );
};

export default SettingsModal;
