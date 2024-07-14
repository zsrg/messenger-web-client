import Header from "../common/layouts/Header";
import IconButton from "../common/inputs/IconButton";
import Title from "../common/dataDisplay/Title";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";

export interface DialogInfoHeaderProps {
  toggleDialogInfo: () => void;
}

const DialogInfoHeader: FC<DialogInfoHeaderProps> = ({ toggleDialogInfo }) => {
  const { t } = useTranslation();

  return (
    <Header
      leftItems={<Title>{t("messengerPage.dialogInfoHeader.title")}</Title>}
      rightItems={
        <IconButton
          onClick={toggleDialogInfo}
          title={t("messengerPage.dialogInfoHeader.closeDialogInfo")}
        >
          <FontAwesomeIcon icon={faXmark} />
        </IconButton>
      }
    />
  );
};

export default DialogInfoHeader;
