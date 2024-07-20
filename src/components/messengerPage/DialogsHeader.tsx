import ContactsModal from "./modals/ContactsModal";
import FloatingButton from "../common/inputs/FloatingButton";
import Header from "../common/layouts/Header";
import IconButton from "../common/inputs/IconButton";
import TextInput from "../common/inputs/TextInput";
import useToggle from "../../hooks/useToggle";
import { ChangeEvent, FC } from "react";
import { faBars, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RootState } from "../../redux";
import { setFilter } from "../../redux/slices/dialogs";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useTranslation } from "react-i18next";

export interface DialogsHeaderProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

const DialogsHeader: FC<DialogsHeaderProps> = ({ isMenuOpen, toggleMenu }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const [isContactsModalOpen, toggleContactsModal] = useToggle(false);

  const filter = useAppSelector((state: RootState) => state.dialogs.filter);

  const handleChangeFilter = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilter(e.target.value));
  };

  return (
    <Header
      leftItems={
        <>
          <IconButton
            onClick={toggleMenu}
            active={isMenuOpen}
          >
            <FontAwesomeIcon icon={faBars} />
          </IconButton>

          <IconButton
            className="dont-show-on-compact"
            onClick={toggleContactsModal}
            title={t("messengerPage.dialogsHeader.createDialog")}
          >
            <FontAwesomeIcon icon={faPlus} />
          </IconButton>

          <TextInput
            placeholder={t("messengerPage.dialogsHeader.search")}
            value={filter || ""}
            onChange={handleChangeFilter}
          />

          <ContactsModal
            isOpen={isContactsModalOpen}
            toggle={toggleContactsModal}
          />

          <FloatingButton
            className="show-on-compact"
            onClick={toggleContactsModal}
          >
            <FontAwesomeIcon icon={faPlus} />
          </FloatingButton>
        </>
      }
    />
  );
};

export default DialogsHeader;
