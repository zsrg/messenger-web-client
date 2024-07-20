import ChangeLoginModal from "./dialogs/ChangeLoginModal";
import ChangeNameModal from "./dialogs/ChangeNameModal";
import List from "../../../common/layouts/List";
import MenuItem from "../../../common/dataDisplay/MenuItem";
import useToggle from "../../../../hooks/useToggle";
import { faAt, faFileSignature } from "@fortawesome/free-solid-svg-icons";
import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";

const EditProfilePage: FC = () => {
  const [isChangeNameModalOpen, toggleChangeNameModal] = useToggle(false);
  const [isChangeLoginModalOpen, toggleChangeLoginModal] = useToggle(false);

  const { t } = useTranslation();

  return (
    <>
      <List>
        <MenuItem
          primaryElement={<FontAwesomeIcon icon={faFileSignature} />}
          text={t("messengerPage.modals.settings.editProfilePage.changeName")}
          onClick={toggleChangeNameModal}
        />
        <MenuItem
          primaryElement={<FontAwesomeIcon icon={faAt} />}
          text={t("messengerPage.modals.settings.editProfilePage.changeLogin")}
          onClick={toggleChangeLoginModal}
        />
      </List>

      <ChangeNameModal
        isOpen={isChangeNameModalOpen}
        toggle={toggleChangeNameModal}
      />

      <ChangeLoginModal
        isOpen={isChangeLoginModalOpen}
        toggle={toggleChangeLoginModal}
      />
    </>
  );
};

export default EditProfilePage;
