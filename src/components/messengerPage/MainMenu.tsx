import List from "../common/layouts/List";
import MenuItem from "../common/dataDisplay/MenuItem";
import SettingsModal from "./modals/settings/SettingsModal";
import useToggle from "../../hooks/useToggle";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";

const MainMenu: FC = () => {
  const [isSettingsModalOpen, toggleSettingsModal] = useToggle(false);
  const { t } = useTranslation();

  return (
    <>
      <List>
        <MenuItem
          primaryElement={<FontAwesomeIcon icon={faGear} />}
          text={t("messengerPage.mainMenu.settings")}
          onClick={toggleSettingsModal}
        />
      </List>

      <SettingsModal
        isOpen={isSettingsModalOpen}
        toggle={toggleSettingsModal}
      />
    </>
  );
};

export default MainMenu;
