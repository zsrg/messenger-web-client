import List from "../../../common/layouts/List";
import MenuItem from "../../../common/dataDisplay/MenuItem";
import packageInfo from "../../../../../package.json";
import { FC } from "react";
import { useTranslation } from "react-i18next";

const AboutPage: FC = () => {
  const { version } = packageInfo || {};
  const { t } = useTranslation();

  return (
    <List>
      <MenuItem
        text={t("messengerPage.modals.settings.infoPage.version", { version })}
        disableHover
      />
    </List>
  );
};

export default AboutPage;
