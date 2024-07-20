import List from "../../../common/layouts/List";
import MenuItem from "../../../common/dataDisplay/MenuItem";
import Toggle from "../../../common/inputs/Toggle";
import { FC } from "react";
import { Language } from "../../../../types/settings";
import { useTranslation } from "react-i18next";

const LanguagePage: FC = () => {
  const { i18n, t } = useTranslation();
  const language = i18n.resolvedLanguage;

  const handleChangeLanguage = (language: Language) => {
    i18n.changeLanguage(language);
  };

  return (
    <List>
      <MenuItem
        primaryElement={
          <Toggle
            type="radio"
            checked={language === Language.English}
            onChange={() => handleChangeLanguage(Language.English)}
          />
        }
        text={t("messengerPage.modals.settings.languagePage.en")}
        secondaryElement={<span>{"en"}</span>}
      />
    </List>
  );
};

export default LanguagePage;
